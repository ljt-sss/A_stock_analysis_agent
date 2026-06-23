from datetime import date, datetime, timedelta
from sqlalchemy import select
from app.core.database import SessionLocal
from app.models.agent import ToolCallLog
from app.models.eval import EvalCase, EvalResult
from app.models.financial import BusinessSegment, FinancialBalanceSheet, FinancialCashflowStatement, FinancialIncomeStatement, FinancialIndicator
from app.models.memory import AgentMemory
from app.models.report import CompanyNews, CompanyReport, ReportChunk, SectorHotEvent
from app.models.stock import InvestmentThesis, StockBasic, StockPriceDaily, StockValuationDaily, WatchlistGroup, WatchlistStock
from app.models.wiki import WikiChunk, WikiPage
from app.services.stocks.mock_data import STOCKS, quarterly_financials, segments, valuation_series

def seed_demo_data() -> None:
    db=SessionLocal()
    if db.scalar(select(StockBasic).limit(1)):
        print("Demo data already exists."); db.close(); return
    for stock in STOCKS:
        db.add(StockBasic(ts_code=stock["ts_code"],symbol=stock["symbol"],name=stock["name"],exchange=stock["exchange"],market=stock["market"],industry=stock["industry"],sector=stock["sector"],list_date=date(2001,8,27),status="active"))
        for point in valuation_series(stock):
            trade_date=date.fromisoformat(point["date"]); db.add(StockPriceDaily(ts_code=stock["ts_code"],trade_date=trade_date,open=stock["price"]*0.99,high=stock["price"]*1.02,low=stock["price"]*0.98,close=stock["price"],pre_close=stock["price"]/(1+stock["pct_chg"]/100),change=stock["price"]*stock["pct_chg"]/100,pct_chg=stock["pct_chg"],volume=12800000,amount=2190000000,source="mock")); db.add(StockValuationDaily(ts_code=stock["ts_code"],trade_date=trade_date,pe_ttm=point["pe_ttm"],pb=point["pb"],ps_ttm=6.2,dividend_yield=stock["dividend_yield"],total_mv=point["total_mv"],circ_mv=point["total_mv"]*0.94,pe_percentile_5y=34,pb_percentile_5y=48,source="mock"))
        for row in quarterly_financials(stock["ts_code"]):
            db.add(FinancialIncomeStatement(ts_code=stock["ts_code"],report_period=row["period"],report_type="q",revenue=row["revenue"],operating_profit=row["net_profit_parent"]*1.08,total_profit=row["net_profit_parent"]*1.06,net_profit=row["net_profit_parent"],net_profit_parent=row["net_profit_parent"],net_profit_deducted=row["net_profit_parent"]*0.97,eps_basic=8.2,source="mock"))
            db.add(FinancialBalanceSheet(ts_code=stock["ts_code"],report_period=row["period"],total_assets=row["total_assets"],total_liabilities=row["total_liabilities"],equity_parent=row["equity_parent"],monetary_funds=row["total_assets"]*0.55,accounts_receivable=row["total_assets"]*0.03,inventories=row["total_assets"]*0.16,goodwill=0,short_term_borrowing=row["total_liabilities"]*0.08,long_term_borrowing=row["total_liabilities"]*0.03,contract_liabilities=row["total_liabilities"]*0.31,source="mock"))
            db.add(FinancialCashflowStatement(ts_code=stock["ts_code"],report_period=row["period"],net_operate_cashflow=row["net_operate_cashflow"],net_invest_cashflow=-row["net_profit_parent"]*0.18,net_finance_cashflow=-row["net_profit_parent"]*0.36,capex=row["net_profit_parent"]*0.12,free_cashflow=row["net_operate_cashflow"]-row["net_profit_parent"]*0.12,cash_received_from_sales=row["revenue"]*1.08,source="mock"))
            db.add(FinancialIndicator(ts_code=stock["ts_code"],report_period=row["period"],gross_margin=row["gross_margin"],net_margin=row["net_margin"],roe=row["roe"],roa=row["roe"]*0.72,roic=row["roe"]*0.81,debt_asset_ratio=row["debt_asset_ratio"],current_ratio=2.1,quick_ratio=1.72,ocf_to_net_profit=row["net_operate_cashflow"]/max(row["net_profit_parent"],1),revenue_yoy=row["revenue_yoy"],net_profit_yoy=row["net_profit_yoy"],deducted_profit_yoy=row["net_profit_yoy"]-1.2,asset_turnover=0.62,inventory_turnover=1.8,ar_turnover=12.3,source="mock"))
        for segment in segments(stock["ts_code"]): db.add(BusinessSegment(ts_code=stock["ts_code"],report_period="2023FY",segment_name=segment["segment_name"],revenue=1000*segment["revenue_ratio"]/100,revenue_ratio=segment["revenue_ratio"],gross_profit=600*segment["revenue_ratio"]/100,gross_margin=segment["gross_margin"]))
    group=WatchlistGroup(name="长期价值观察",description="核心组合与长期跟踪",color="#2563eb",sort_order=1); db.add(group); db.flush()
    for i,stock in enumerate(STOCKS[:5]): db.add(WatchlistStock(group_id=group.id,ts_code=stock["ts_code"],priority="high" if i<2 else "normal",status="tracking",added_reason="基本面长期跟踪",latest_report_period="2024Q1",next_review_at=datetime.utcnow()+timedelta(days=20+i*3)))
    db.add(InvestmentThesis(ts_code="600519.SH",title="品牌与渠道壁垒",thesis="品牌壁垒、渠道掌控力和高端白酒需求支撑长期盈利能力。",key_assumptions=["批价保持稳定","直营占比提升","ROE维持高位"],watch_indicators=["飞天茅台批价","直营占比","合同负债YoY","经营现金流YoY"],confidence=0.82))
    report=CompanyReport(ts_code="600519.SH",report_type="q1",report_period="2024Q1",title="贵州茅台2024年第一季度报告",publish_date=date(2024,4,27),source="mock-cninfo",source_url="mock://cninfo/600519/2024Q1",parse_status="success",parse_progress=100,extraction_completeness=96.8,summary="收入利润稳健增长，现金流表现良好。"); db.add(report); db.flush(); db.add(ReportChunk(report_id=report.id,ts_code="600519.SH",chunk_index=0,section_title="经营情况",page_start=4,page_end=6,content="2024Q1营业收入同比增长，归母净利润保持稳健。",token_count=38,meta={"report_period":"2024Q1"}))
    wiki=WikiPage(page_type="company",title="贵州茅台公司研究卡",slug="guizhou-maotai",ts_code="600519.SH",content_md="# 贵州茅台\n\n## 商业模式\n品牌、产能和渠道构成核心壁垒。\n\n## 跟踪指标\n批价、直营占比、合同负债、经营现金流。",freshness="fresh",updated_by="agent"); db.add(wiki); db.flush(); db.add(WikiChunk(wiki_page_id=wiki.id,chunk_index=0,heading="商业模式",content="品牌、产能和渠道构成核心壁垒。",meta={"ts_code":"600519.SH"}))
    db.add(AgentMemory(scope="stock",memory_type="investment_thesis",ts_code="600519.SH",title="品牌壁垒假设",content="高端品牌心智与渠道掌控力是长期盈利的核心。",source="researcher",confidence=0.86)); db.add(AgentMemory(scope="stock",memory_type="watch_indicator",ts_code="600519.SH",title="重点观察",content="关注批价、直营占比和合同负债变化。",source="agent",confidence=0.82))
    for i,title in enumerate(["白酒渠道库存边际改善","公司发布季度经营数据","食品饮料板块机构调研升温"]): db.add(CompanyNews(ts_code="600519.SH",title=title,content="Mock 新闻事件用于演示聚类和热点归因。",url=f"mock://news/{i}",source="mock-news",publish_time=datetime.utcnow()-timedelta(hours=i*6),sentiment="positive" if i!=1 else "neutral",event_type="industry",entities=["贵州茅台","食品饮料"]))
    for i,(sector,score,chg) in enumerate([("低空经济",92.4,3.8),("食品饮料",78.6,1.2),("新能源",74.2,0.8),("银行",69.8,-0.2)]): db.add(SectorHotEvent(sector_name=sector,event_date=date(2024,5,20),heat_score=score,change_pct=chg,turnover=520+i*80,reasons=["政策催化","资金关注","产业事件"],related_stocks=STOCKS[i:i+2],evidence_news_ids=[]))
    case=EvalCase(case_id="EVL-20240520-0087",name="分析贵州茅台2024Q1业绩表现与利润质量",task_type="fundamental_analysis",input={"ts_code":"600519.SH","report_period":"2024Q1"},expected_checks={"must_include_sections":["估值位置","盈利能力","现金流质量","风险提示"],"must_have_citations":True,"forbidden_phrases":["建议买入","强烈推荐","目标价"]},skill_name="three_statement_analysis"); db.add(case); db.flush(); db.add(EvalResult(eval_case_id=case.id,score=94,data_accuracy=96.28,retrieval_hit_rate=92.15,citation_coverage=88.73,hallucination_rate=2.18,tool_success_rate=95.44,completeness=93.2,status="passed"))
    for tool,latency in [("market-data-mcp.get_valuation_history",286),("financial-report-mcp.get_income_statement",412),("wiki-memory-mcp.search_wiki",156)]: db.add(ToolCallLog(tool_name=tool,tool_type="mcp",input={"mode":"seed"},output={"status":"ok"},status="success",latency_ms=latency))
    db.commit(); db.close(); print("Demo data seeded.")

if __name__=="__main__": seed_demo_data()
