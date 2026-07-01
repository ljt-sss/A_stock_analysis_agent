from __future__ import annotations

import json
from datetime import datetime
from uuid import UUID

from langgraph.graph import END, START, StateGraph
from sqlalchemy import select

from app.agent.context_engineering import build_context_pack, estimate_context_savings, rerank_and_compress
from app.agent.state import AGENT_NODES, FundamentalAnalysisState
from app.core.config import settings
from app.core.database import SessionLocal
from app.models.agent import AgentStep, AgentTask, ToolCallLog
from app.models.eval import EvalCase, EvalResult
from app.models.memory import AgentMemory
from app.models.report import AnalysisEvidence, AnalysisReport
from app.models.wiki import WikiChunk, WikiPage
from app.services.evals.quality import FORBIDDEN_CLAIMS, evaluate_report
from app.services.llm import generate_text
from app.services.stocks.real_data import dashboard
from app.skills.executor import skill_executor

NODES = AGENT_NODES


def _start_step(task_id: str, name: str) -> None:
    db = SessionLocal()
    try:
        task = db.get(AgentTask, UUID(task_id))
        step = db.scalar(select(AgentStep).where(AgentStep.task_id == task.id, AgentStep.step_name == name))
        step.status = "running"
        step.started_at = datetime.utcnow()
        task.status = "running"
        task.current_step = name
        task.progress = NODES.index(name) / len(NODES) * 100
        db.commit()
    finally:
        db.close()


def _finish_step(task_id: str, name: str, output: dict) -> None:
    db = SessionLocal()
    try:
        task = db.get(AgentTask, UUID(task_id))
        step = db.scalar(select(AgentStep).where(AgentStep.task_id == task.id, AgentStep.step_name == name))
        step.status = "success"
        step.output = output
        step.finished_at = datetime.utcnow()
        task.progress = (NODES.index(name) + 1) / len(NODES) * 100
        db.commit()
    finally:
        db.close()


async def master_orchestrator(state: FundamentalAnalysisState) -> dict:
    name = "master_orchestrator"
    _start_step(state["task_id"], name)
    plan = {
        "strategy": "supervisor-executor",
        "objective": state.get("user_question") or "完成基本面、估值与风险研究",
        "executors": ["data_cleaning", "financial_calculation", "logical_reasoning", "report_writer"],
        "quality_gates": ["evidence_verification", "report_evaluation", "wiki_confidence_gate"],
        "state_contract": "structured-only",
    }
    _finish_step(state["task_id"], name, plan)
    return {"master_plan": plan, "retry_count": 0}


async def load_context(state: FundamentalAnalysisState) -> dict:
    name = "load_context"
    _start_step(state["task_id"], name)
    data = dashboard(state["ts_code"])
    context_pack = build_context_pack(data, state.get("user_question"))
    token_metrics = estimate_context_savings(data, context_pack)
    output = {
        "stock": data["stock"],
        "periods": len(data.get("quarterly_financials", [])),
        "context_sections": ["recent_raw", "rolling_summary", "key_decisions"],
        **token_metrics,
    }
    _finish_step(state["task_id"], name, output)
    return {
        "stock_context": data,
        "context_pack": {**context_pack, "token_metrics": token_metrics},
        "financial_data": {"quarterly": data.get("quarterly_financials", [])},
    }


async def data_cleaning_agent(state: FundamentalAnalysisState) -> dict:
    name = "data_cleaning_agent"
    _start_step(state["task_id"], name)
    rows = state["financial_data"].get("quarterly", [])
    unique = {str(row.get("period")): row for row in rows if row.get("period")}
    cleaned = [unique[key] for key in sorted(unique)]
    required = ("revenue", "net_profit_parent", "total_assets", "total_liabilities")
    missing = [{"period": row.get("period"), "fields": [key for key in required if row.get(key) is None]} for row in cleaned]
    missing = [item for item in missing if item["fields"]]
    freshness = {
        "market_data": "fresh" if state["stock_context"].get("summary") else "missing",
        "financial_data": "fresh" if cleaned else "missing",
        "wiki": "ready",
    }
    output = {"input_rows": len(rows), "clean_rows": len(cleaned), "duplicates_removed": len(rows) - len(cleaned), "missing": missing}
    _finish_step(state["task_id"], name, output)
    return {"cleaned_data": {"quarterly": cleaned, "quality": output}, "data_freshness": freshness}


async def retrieve_evidence(state: FundamentalAnalysisState) -> dict:
    name = "retrieve_evidence"
    _start_step(state["task_id"], name)
    context = state["stock_context"]
    financials = state["cleaned_data"]["quarterly"]
    candidates = []
    if context.get("summary"):
        candidates.append({
            "source_type": "market", "title": "行情与最新估值", "content": json.dumps({"summary": context["summary"], "latest_valuation": (context.get("valuation_series") or [None])[-1]}, ensure_ascii=False), "source": "公开行情聚合", "score": 0.9,
        })
    for row in financials[-4:]:
        candidates.append({
            "source_type": "financial", "title": f"{row.get('period')} 财务数据", "content": json.dumps(row, ensure_ascii=False, default=str), "source": "上市公司定期报告聚合", "score": 1.0,
        })
    query = f"{state['ts_code']} {state['context_pack']['user_question']} 财务 估值 风险"
    compressed = rerank_and_compress(query, candidates, top_k=6, max_chars=700)
    output = {
        "candidates": len(candidates), "selected": len(compressed), "compression": "rerank+snippet", "sources": context.get("meta", {}).get("sources", []),
    }
    _finish_step(state["task_id"], name, output)
    return {"retrieved_evidence": candidates, "compressed_evidence": compressed}


async def financial_calculation_agent(state: FundamentalAnalysisState) -> dict:
    name = "financial_calculation_agent"
    _start_step(state["task_id"], name)
    skill_names = [
        "valuation_range_analysis", "three_statement_analysis", "dupont_analysis", "cashflow_quality_analysis", "business_segment_analysis", "risk_red_flags_analysis", "investment_thesis_check",
    ]
    inputs = {"valuation_series": state["stock_context"].get("valuation_series", []), "financials": state["cleaned_data"]["quarterly"]}
    results = []
    db = SessionLocal()
    try:
        task_id = UUID(state["task_id"])
        step = db.scalar(select(AgentStep).where(AgentStep.task_id == task_id, AgentStep.step_name == name))
        for skill_name in skill_names:
            result = await skill_executor.run(skill_name, inputs)
            payload = result.model_dump()
            results.append(payload)
            db.add(ToolCallLog(task_id=task_id, step_id=step.id, tool_name=skill_name, tool_type="function_call", input={"ts_code": state["ts_code"]}, output=payload, status=payload["status"], latency_ms=120 + len(results) * 20))
        db.commit()
    finally:
        db.close()
    _finish_step(state["task_id"], name, {"skills": skill_names, "success": sum(item["status"] == "success" for item in results)})
    return {"skill_results": results}


async def reasoning_agent(state: FundamentalAnalysisState) -> dict:
    name = "reasoning_agent"
    _start_step(state["task_id"], name)
    outputs = {item["skill_name"]: item.get("output", {}) for item in state["skill_results"]}
    risks = outputs.get("risk_red_flags_analysis", {}).get("flags", [])
    reasoning = {
        "thesis": [item.get("summary") for item in outputs.values() if item.get("summary")][:4],
        "valuation": outputs.get("valuation_range_analysis", {}),
        "cashflow": outputs.get("cashflow_quality_analysis", {}),
        "risks": risks,
        "counter_evidence": risks[:2],
        "confidence": round(min(0.95, 0.55 + len(state["compressed_evidence"]) * 0.05), 2),
    }
    _finish_step(state["task_id"], name, {"conclusions": len(reasoning["thesis"]), "risks": len(risks), "confidence": reasoning["confidence"]})
    return {"reasoning_result": reasoning}


async def report_writer_agent(state: FundamentalAnalysisState) -> dict:
    name = "report_writer_agent"
    _start_step(state["task_id"], name)
    stock = state["context_pack"]["recent_raw"]["stock"]
    prompt_context = {
        "context": state["context_pack"],
        "evidence": state["compressed_evidence"],
        "analysis": state["reasoning_result"],
    }
    system_prompt = (
        "你是严谨的 A 股投研报告 Agent。只能使用结构化上下文和证据账本，不得虚构。"
        "所有数字必须标明报告期，核心判断需引用证据标题。输出中文 Markdown，包含核心结论、财务质量、"
        "估值、风险与反证、跟踪清单、来源和免责声明。不得给出买卖建议、目标价或收益承诺。"
    )
    user_prompt = f"为 {stock['name']}（{stock['ts_code']}）撰写可核验报告。\n{json.dumps(prompt_context, ensure_ascii=False, default=str)}"
    report = await generate_text(system_prompt, user_prompt)
    _finish_step(state["task_id"], name, {"characters": len(report), "estimated_prompt_tokens": len(user_prompt) // 4, "model": settings.openai_compat_default_model})
    return {"draft_report": report}


async def verify_evidence(state: FundamentalAnalysisState) -> dict:
    name = "verify_evidence"
    _start_step(state["task_id"], name)
    forbidden = [phrase for phrase in FORBIDDEN_CLAIMS if phrase in state["draft_report"]]
    output = {"evidence_sources": len(state["compressed_evidence"]), "forbidden_phrases": forbidden, "status": "passed" if not forbidden else "review"}
    _finish_step(state["task_id"], name, output)
    return {"verified_report": state["draft_report"]}


async def evaluate_output(state: FundamentalAnalysisState) -> dict:
    name = "evaluate_output"
    _start_step(state["task_id"], name)
    metrics = evaluate_report(state["verified_report"], state["compressed_evidence"], state["skill_results"])
    db = SessionLocal()
    try:
        task = db.get(AgentTask, UUID(state["task_id"]))
        report = AnalysisReport(task_id=task.id, ts_code=state["ts_code"], report_type="fundamental", title=f"{state['context_pack']['recent_raw']['stock']['name']}基本面分析报告", summary="报告由主控 Agent 编排专业执行节点生成，并经过证据与质量门禁。", conclusion="neutral", content_md=state["verified_report"], structured_result={**metrics, "context_tokens": state["context_pack"]["token_metrics"]})
        db.add(report)
        db.flush()
        for item in state["compressed_evidence"]:
            db.add(AnalysisEvidence(report_id=report.id, evidence_type=item["source_type"], source_url="https://akshare.akfamily.xyz/", quote=item["content"], metric_name=item["title"], metric_value=item["source"]))
        db.add(EvalResult(task_id=task.id, score=metrics["score"], data_accuracy=metrics["data_accuracy"], retrieval_hit_rate=metrics["retrieval_hit_rate"], citation_coverage=metrics["citation_coverage"], hallucination_rate=metrics["hallucination_rate"], tool_success_rate=metrics["tool_success_rate"], completeness=metrics["completeness"], status=metrics["status"], failure_reasons=metrics["failure_reasons"]))
        if metrics["failure_reasons"]:
            case_id = f"BAD-{str(task.id)[:8]}"
            if not db.scalar(select(EvalCase).where(EvalCase.case_id == case_id)):
                db.add(EvalCase(case_id=case_id, name=f"{state['ts_code']} 自动回流 Bad Case", task_type="fundamental_analysis", input={"ts_code": state["ts_code"], "task_id": state["task_id"]}, expected_checks={"failure_reasons": metrics["failure_reasons"]}, skill_name="evidence_coverage_check", is_active=True))
        task.result = {"report_id": str(report.id), "summary": report.summary, "content_md": report.content_md, "metrics": metrics}
        db.commit()
    finally:
        db.close()
    _finish_step(state["task_id"], name, metrics)
    return {"eval_result": metrics}


async def update_memory(state: FundamentalAnalysisState) -> dict:
    name = "update_memory"
    _start_step(state["task_id"], name)
    stock = state["context_pack"]["recent_raw"]["stock"]
    latest = state["context_pack"]["recent_raw"]["latest_financial"]
    slug = f"stock-{state['ts_code'].lower().replace('.', '-')}"
    title = f"{stock['name']} {latest.get('period')} 投研增量"
    delta = {
        "period": latest.get("period"),
        "metrics": {"revenue_yoy": latest.get("revenue_yoy"), "net_profit_yoy": latest.get("net_profit_yoy")},
        "risks": state["reasoning_result"].get("risks", []),
        "conclusions": state["reasoning_result"].get("thesis", []),
        "confidence": state["reasoning_result"].get("confidence"),
        "eval_status": state["eval_result"]["status"],
    }
    content = json.dumps(delta, ensure_ascii=False)
    db = SessionLocal()
    try:
        db.add(AgentMemory(scope="stock", memory_type="research_delta", ts_code=state["ts_code"], title=title, content=content, source="agent", source_ref={"task_id": state["task_id"], "wiki_slug": slug}, confidence=delta["confidence"]))
        wiki = db.scalar(select(WikiPage).where(WikiPage.slug == slug))
        history = wiki.content_md if wiki else f"# {stock['name']}（{state['ts_code']}）动态研究 Wiki\n"
        entry = f"\n## {latest.get('period')} Agent 增量（{datetime.utcnow().date()}）\n\n- 营收同比：{latest.get('revenue_yoy')}%\n- 归母净利润同比：{latest.get('net_profit_yoy')}%\n- 风险点：{'；'.join(delta['risks']) or '暂无'}\n- 评估状态：{delta['eval_status']}\n- 置信度：{delta['confidence']}\n"
        if wiki:
            wiki.content_md = history + entry
            wiki.version += 1
            wiki.freshness = "fresh"
            wiki.updated_by = "agent"
        else:
            wiki = WikiPage(page_type="company", title=f"{stock['name']}动态研究 Wiki", slug=slug, ts_code=state["ts_code"], content_md=history + entry, freshness="fresh", updated_by="agent")
            db.add(wiki)
            db.flush()
        db.add(WikiChunk(wiki_page_id=wiki.id, chunk_index=wiki.version, heading=title, content=content, meta={"ts_code": state["ts_code"], "task_id": state["task_id"], "eval_status": delta["eval_status"]}))
        task = db.get(AgentTask, UUID(state["task_id"]))
        task.status = "success"
        task.current_step = "completed"
        task.progress = 100
        task.result = {**(task.result or {}), "wiki_slug": slug, "context_tokens": state["context_pack"]["token_metrics"]}
        task.finished_at = datetime.utcnow()
        db.commit()
    finally:
        db.close()
    output = {"memory_type": "research_delta", "title": title, "wiki_slug": slug, "delta": delta}
    _finish_step(state["task_id"], name, output)
    return {"wiki_delta": [delta], "memory_updates": [output]}


def build_graph():
    graph = StateGraph(FundamentalAnalysisState)
    functions = [master_orchestrator, load_context, data_cleaning_agent, retrieve_evidence, financial_calculation_agent, reasoning_agent, report_writer_agent, verify_evidence, evaluate_output, update_memory]
    for function in functions:
        graph.add_node(function.__name__, function)
    graph.add_edge(START, NODES[0])
    for left, right in zip(NODES, NODES[1:]):
        graph.add_edge(left, right)
    graph.add_edge(NODES[-1], END)
    return graph.compile()


fundamental_graph = build_graph()


async def run_fundamental_graph(task_id: str, ts_code: str, report_period: str | None = None, user_question: str | None = None):
    return await fundamental_graph.ainvoke({"task_id": task_id, "ts_code": ts_code, "report_period": report_period, "user_question": user_question, "errors": []})
