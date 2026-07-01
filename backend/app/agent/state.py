from typing import Any, TypedDict

AGENT_NODES = [
    "master_orchestrator",
    "load_context",
    "data_cleaning_agent",
    "retrieve_evidence",
    "financial_calculation_agent",
    "reasoning_agent",
    "report_writer_agent",
    "verify_evidence",
    "evaluate_output",
    "update_memory",
]


class FundamentalAnalysisState(TypedDict, total=False):
    task_id: str
    ts_code: str
    report_period: str | None
    user_question: str | None

    master_plan: dict[str, Any]
    data_freshness: dict[str, Any]
    context_pack: dict[str, Any]
    stock_context: dict[str, Any]
    financial_data: dict[str, Any]
    cleaned_data: dict[str, Any]
    retrieved_evidence: list[dict[str, Any]]
    compressed_evidence: list[dict[str, Any]]
    skill_results: list[dict[str, Any]]
    reasoning_result: dict[str, Any]
    draft_report: str
    verified_report: str
    wiki_delta: list[dict[str, Any]]
    memory_updates: list[dict[str, Any]]
    eval_result: dict[str, Any]
    retry_count: int
    errors: list[str]
