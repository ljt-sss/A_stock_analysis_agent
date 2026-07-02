import app.agent.context_engineering as context_engineering
from app.agent.context_engineering import build_context_pack, estimate_context_savings, rerank_and_compress
from app.core.config import settings
from app.services.evals.quality import evaluate_report


def test_context_pack_keeps_recent_summary_and_decisions():
    raw = {
        "stock": {"name": "测试公司", "ts_code": "600000.SH"},
        "summary": {"pe_ttm": 12.5},
        "quarterly_financials": [{"period": f"202{i}Q4", "revenue": i * 100} for i in range(1, 6)],
        "valuation_series": [{"date": f"202{i}-12-31", "pe_ttm": 10 + i} for i in range(1, 6)],
        "meta": {"sources": ["public"]},
    }
    pack = build_context_pack(raw, "分析估值风险")
    savings = estimate_context_savings(raw, pack)
    assert set(("recent_raw", "rolling_summary", "key_decisions")) <= pack.keys()
    assert pack["recent_raw"]["latest_financial"]["period"] == "2025Q4"
    assert savings["packed_estimated_tokens"] > 0


def test_reranker_prefers_financial_evidence_and_compresses():
    items = [
        {"source_type": "news", "title": "一般新闻", "content": "行业信息" * 500, "score": 0.2},
        {"source_type": "financial", "title": "财务估值风险", "content": "PE 12.5，营收增长", "score": 0.5},
    ]
    ranked = rerank_and_compress("财务估值风险 PE", items, top_k=2, max_chars=80)
    assert ranked[0]["source_type"] == "financial"
    assert len(ranked[1]["content"]) <= 83


def test_cross_encoder_reranker_falls_back_to_lexical(monkeypatch):
    def fail_to_load(_model_name):
        raise RuntimeError("model unavailable")

    monkeypatch.setattr(settings, "reranker_provider", "cross_encoder")
    monkeypatch.setattr(context_engineering, "_load_cross_encoder", fail_to_load)
    items = [
        {"source_type": "news", "title": "一般新闻", "content": "行业信息", "score": 0.2},
        {"source_type": "financial", "title": "财务估值风险", "content": "PE 12.5，营收增长", "score": 0.5},
    ]
    ranked = rerank_and_compress("财务估值风险 PE", items, top_k=2, max_chars=80)
    assert ranked[0]["source_type"] == "financial"
    assert ranked[0]["reranker"] == "lexical"
    assert ranked[0]["reranker_error"].startswith("cross_encoder_fallback")
    monkeypatch.setattr(settings, "reranker_provider", "lexical")


def test_eval_creates_failure_reason_for_unsupported_numbers():
    metrics = evaluate_report("估值为 99.9，存在风险。", [{"content": "估值为 12.5"}], [{"status": "success"}])
    assert metrics["data_accuracy"] == 0
    assert metrics["status"] == "review"
    assert metrics["failure_reasons"]
