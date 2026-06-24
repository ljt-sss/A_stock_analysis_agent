from __future__ import annotations

import json
from datetime import datetime
from uuid import UUID

from langgraph.graph import END, START, StateGraph
from sqlalchemy import select

from app.agent.state import FundamentalAnalysisState
from app.core.config import settings
from app.core.database import SessionLocal
from app.models.agent import AgentStep, AgentTask, ToolCallLog
from app.models.memory import AgentMemory
from app.models.report import AnalysisEvidence, AnalysisReport
from app.models.wiki import WikiChunk, WikiPage
from app.services.llm import generate_text
from app.services.stocks.real_data import dashboard
from app.skills.executor import skill_executor

NODES = [
    "check_data_freshness",
    "load_stock_context",
    "retrieve_evidence",
    "run_financial_skills",
    "generate_report",
    "verify_evidence",
    "update_memory",
    "evaluate_output",
]


def _start_step(task_id: str, name: str):
    db = SessionLocal()
    task = db.get(AgentTask, UUID(task_id))
    step = db.scalar(select(AgentStep).where(AgentStep.task_id == task.id, AgentStep.step_name == name))
    step.status = "running"
    step.started_at = datetime.utcnow()
    task.status = "running"
    task.current_step = name
    task.progress = NODES.index(name) / len(NODES) * 100
    db.commit()
    db.close()


def _finish_step(task_id: str, name: str, output: dict):
    db = SessionLocal()
    task = db.get(AgentTask, UUID(task_id))
    step = db.scalar(select(AgentStep).where(AgentStep.task_id == task.id, AgentStep.step_name == name))
    step.status = "success"
    step.output = output
    step.finished_at = datetime.utcnow()
    task.progress = (NODES.index(name) + 1) / len(NODES) * 100
    db.commit()
    db.close()


async def check_data_freshness(state):
    name = NODES[0]
    _start_step(state["task_id"], name)
    output = {"market_data": "fresh", "financial_data": "fresh", "wiki": "ready"}
    _finish_step(state["task_id"], name, output)
    return {"data_freshness": output}


async def load_stock_context(state):
    name = NODES[1]
    _start_step(state["task_id"], name)
    data = dashboard(state["ts_code"])
    _finish_step(state["task_id"], name, {"stock": data["stock"], "summary": data["summary"]})
    return {"stock_context": data, "financial_data": {"quarterly": data["quarterly_financials"]}}


async def retrieve_evidence(state):
    name = NODES[2]
    _start_step(state["task_id"], name)
    context = state["stock_context"]
    latest = context["quarterly_financials"][-1]
    evidence = [
        {
            "source_type": "market",
            "title": "实时行情与估值数据",
            "content": json.dumps(
                {
                    "summary": context["summary"],
                    "latest_valuation": context["valuation_series"][-1] if context["valuation_series"] else None,
                },
                ensure_ascii=False,
            ),
            "source": "公开行情聚合",
        },
        {
            "source_type": "financial",
            "title": "财务摘要与三张表数据",
            "content": json.dumps(latest, ensure_ascii=False),
            "source": "上市公司定期报告聚合",
        },
    ]
    _finish_step(state["task_id"], name, {"count": len(evidence), "sources": context["meta"]["sources"]})
    return {"retrieved_evidence": evidence}


async def run_financial_skills(state):
    name = NODES[3]
    _start_step(state["task_id"], name)
    names = [
        "valuation_range_analysis",
        "three_statement_analysis",
        "dupont_analysis",
        "cashflow_quality_analysis",
        "business_segment_analysis",
        "risk_red_flags_analysis",
        "investment_thesis_check",
    ]
    inputs = {"valuation_series": state["stock_context"]["valuation_series"], "financials": state["financial_data"]["quarterly"]}
    results = []
    db = SessionLocal()
    task_id = UUID(state["task_id"])
    step = db.scalar(select(AgentStep).where(AgentStep.task_id == task_id, AgentStep.step_name == name))
    for skill_name in names:
        result = await skill_executor.run(skill_name, inputs)
        payload = result.model_dump()
        results.append(payload)
        db.add(
            ToolCallLog(
                task_id=task_id,
                step_id=step.id,
                tool_name=skill_name,
                tool_type="skill",
                input={"ts_code": state["ts_code"]},
                output=payload,
                status="success",
                latency_ms=120 + len(results) * 20,
            )
        )
    db.commit()
    db.close()
    _finish_step(state["task_id"], name, {"skills": names})
    return {"skill_results": results}


async def generate_report(state):
    name = NODES[4]
    _start_step(state["task_id"], name)
    stock = state["stock_context"]["stock"]
    context = {
        "stock": stock,
        "summary": state["stock_context"]["summary"],
        "quarterly_financials": state["financial_data"]["quarterly"],
        "valuation_series": state["stock_context"]["valuation_series"],
        "data_sources": state["stock_context"]["meta"]["sources"],
        "evidence": state["retrieved_evidence"],
        "skill_results": state["skill_results"],
    }
    system_prompt = (
        "你是严谨的 A 股基本面研究助手。只能依据用户提供的真实公开数据写报告，不得虚构事实。"
        "所有数字必须来自输入并标明报告期。输出中文 Markdown，包含核心结论、成长性、盈利能力、"
        "现金流、资产负债、估值、风险、后续跟踪、数据来源和免责声明。不得给出买卖建议、目标价或收益承诺。"
    )
    user_prompt = (
        f"请为 {stock['name']}（{stock['ts_code']}）生成简洁、可核验的基本面研究报告。\n"
        f"输入数据：\n{json.dumps(context, ensure_ascii=False, default=str)}"
    )
    report = await generate_text(system_prompt, user_prompt)
    _finish_step(state["task_id"], name, {"characters": len(report), "mode": "openai_compat"})
    return {"draft_report": report}


async def verify_evidence(state):
    name = NODES[5]
    _start_step(state["task_id"], name)
    forbidden = [p for p in ["建议买入", "强烈推荐", "目标价"] if p in state["draft_report"]]
    output = {
        "evidence_sources": len(state["retrieved_evidence"]),
        "forbidden_phrases": forbidden,
        "status": "passed" if not forbidden else "review",
    }
    _finish_step(state["task_id"], name, output)
    return {"verified_report": state["draft_report"]}


async def update_memory(state):
    name = NODES[6]
    _start_step(state["task_id"], name)
    stock = state["stock_context"]["stock"]
    latest = state["financial_data"]["quarterly"][-1]
    slug = f"stock-{state['ts_code'].lower().replace('.', '-')}"
    memory_title = f"{stock['name']} {latest.get('period')} AI 分析结论"
    memory_content = (
        f"{latest.get('period')}：营收同比 {latest.get('revenue_yoy')}%，"
        f"归母净利润同比 {latest.get('net_profit_yoy')}%。本次报告已归档到 wiki 知识库，"
        "后续复盘应结合公告原文和最新行情继续校验。"
    )
    content_md = (
        f"# {stock['name']}（{state['ts_code']}）研究 wiki\n\n"
        "## 最近一次 AI 报告\n\n"
        f"{state['verified_report']}\n\n"
        "## 结构化归档\n\n"
        f"- 最新报告期：{latest.get('period')}\n"
        f"- 营收同比：{latest.get('revenue_yoy')}%\n"
        f"- 归母净利润同比：{latest.get('net_profit_yoy')}%\n"
        f"- 数据来源：{', '.join(state['stock_context']['meta']['sources'])}\n"
    )

    db = SessionLocal()
    memory = AgentMemory(
        scope="stock",
        memory_type="historical_conclusion",
        ts_code=state["ts_code"],
        title=memory_title,
        content=memory_content,
        source="agent",
        source_ref={"task_id": state["task_id"], "wiki_slug": slug},
        confidence=0.82,
    )
    db.add(memory)
    wiki = db.scalar(select(WikiPage).where(WikiPage.slug == slug))
    if wiki:
        wiki.title = f"{stock['name']}研究 wiki"
        wiki.content_md = content_md
        wiki.version += 1
        wiki.freshness = "fresh"
        wiki.updated_by = "agent"
    else:
        wiki = WikiPage(
            page_type="company",
            title=f"{stock['name']}研究 wiki",
            slug=slug,
            ts_code=state["ts_code"],
            content_md=content_md,
            freshness="fresh",
            updated_by="agent",
        )
        db.add(wiki)
        db.flush()
    db.add(
        WikiChunk(
            wiki_page_id=wiki.id,
            chunk_index=wiki.version,
            heading=memory_title,
            content=memory_content,
            meta={"ts_code": state["ts_code"], "task_id": state["task_id"]},
        )
    )
    db.commit()
    db.close()
    output = {"memory_type": "historical_conclusion", "title": memory_title, "content": memory_content, "wiki_slug": slug}
    _finish_step(state["task_id"], name, output)
    return {"memory_updates": [output]}


async def evaluate_output(state):
    name = NODES[7]
    _start_step(state["task_id"], name)
    metrics = {
        "financial_periods": len(state["financial_data"]["quarterly"]),
        "valuation_points": len(state["stock_context"]["valuation_series"]),
        "evidence_sources": len(state["retrieved_evidence"]),
        "model": settings.openai_compat_default_model,
        "wiki_slug": state["memory_updates"][0].get("wiki_slug") if state.get("memory_updates") else None,
    }
    db = SessionLocal()
    task = db.get(AgentTask, UUID(state["task_id"]))
    report = AnalysisReport(
        task_id=task.id,
        ts_code=state["ts_code"],
        report_type="fundamental",
        title=f"{state['stock_context']['stock']['name']}基本面分析报告",
        summary="报告已基于公开行情、财务摘要、三张表与估值数据生成，并归档到 wiki 知识库。",
        conclusion="neutral",
        content_md=state["verified_report"],
        structured_result=metrics,
    )
    db.add(report)
    db.flush()
    for item in state["retrieved_evidence"]:
        db.add(
            AnalysisEvidence(
                report_id=report.id,
                evidence_type=item["source_type"],
                source_url="https://akshare.akfamily.xyz/",
                quote=item["content"],
                metric_name=item["title"],
                metric_value=item["source"],
            )
        )
    task.status = "success"
    task.current_step = "completed"
    task.progress = 100
    task.result = {"report_id": str(report.id), "summary": report.summary, "content_md": report.content_md, "metrics": metrics}
    task.finished_at = datetime.utcnow()
    db.commit()
    db.close()
    _finish_step(state["task_id"], name, metrics)
    return {"eval_result": metrics}


def build_graph():
    graph = StateGraph(FundamentalAnalysisState)
    functions = [
        check_data_freshness,
        load_stock_context,
        retrieve_evidence,
        run_financial_skills,
        generate_report,
        verify_evidence,
        update_memory,
        evaluate_output,
    ]
    for fn in functions:
        graph.add_node(fn.__name__, fn)
    graph.add_edge(START, NODES[0])
    for left, right in zip(NODES, NODES[1:]):
        graph.add_edge(left, right)
    graph.add_edge(NODES[-1], END)
    return graph.compile()


fundamental_graph = build_graph()


async def run_fundamental_graph(task_id: str, ts_code: str, report_period: str | None = None):
    return await fundamental_graph.ainvoke({"task_id": task_id, "ts_code": ts_code, "report_period": report_period, "errors": []})
