from typing import Any, TypedDict
class FundamentalAnalysisState(TypedDict, total=False):
    task_id: str; ts_code: str; report_period: str | None; user_question: str | None
    data_freshness: dict[str, Any]; stock_context: dict[str, Any]; financial_data: dict[str, Any]
    retrieved_evidence: list[dict[str, Any]]; skill_results: list[dict[str, Any]]
    draft_report: str; verified_report: str; memory_updates: list[dict[str, Any]]
    eval_result: dict[str, Any]; errors: list[str]

