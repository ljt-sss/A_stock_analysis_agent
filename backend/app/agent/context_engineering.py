from __future__ import annotations

import json
import re
from functools import lru_cache
from typing import Any

from app.core.config import settings


def _compact(value: Any, limit: int = 1200) -> str:
    text = json.dumps(value, ensure_ascii=False, default=str, separators=(",", ":"))
    return text if len(text) <= limit else f"{text[:limit]}..."


def build_context_pack(
    stock_context: dict[str, Any],
    user_question: str | None = None,
    rolling_summary: str = "",
    key_decisions: list[str] | None = None,
) -> dict[str, Any]:
    financials = stock_context.get("quarterly_financials", [])
    valuations = stock_context.get("valuation_series", [])
    recent_raw = {
        "stock": stock_context.get("stock", {}),
        "summary": stock_context.get("summary", {}),
        "latest_financial": financials[-1] if financials else {},
        "latest_valuation": valuations[-1] if valuations else {},
    }
    summary = rolling_summary or (
        f"已加载 {len(financials)} 期财务数据和 {len(valuations)} 个估值观测点；"
        "后续节点只消费结构化摘要、关键决策和压缩证据。"
    )
    pack = {
        "recent_raw": recent_raw,
        "rolling_summary": summary,
        "key_decisions": key_decisions or ["数字必须保留报告期", "结论必须绑定证据", "禁止输出买卖建议"],
        "user_question": user_question or "分析公司基本面、估值与主要风险",
        "source_manifest": stock_context.get("meta", {}).get("sources", []),
    }
    pack["estimated_tokens"] = max(1, len(_compact(pack, 4000)) // 4)
    return pack


def rerank_and_compress(
    query: str,
    evidence: list[dict[str, Any]],
    top_k: int = 6,
    max_chars: int = 700,
) -> list[dict[str, Any]]:
    terms = {term.lower() for term in re.findall(r"[A-Za-z0-9_.%]+|[\u4e00-\u9fff]{2,}", query)}
    cross_encoder_scores, reranker_error = _cross_encoder_scores(query, evidence)
    ranked = []
    for index, item in enumerate(evidence):
        searchable = f"{item.get('title', '')} {item.get('content', '')}".lower()
        lexical = sum(1 for term in terms if term in searchable)
        source_weight = {"financial": 1.0, "market": 0.9, "report_chunk": 0.8, "wiki": 0.7, "news": 0.6}.get(
            item.get("source_type"), 0.5
        )
        lexical_score = float(item.get("score", 0)) + lexical * 0.15 + source_weight
        semantic_score = cross_encoder_scores[index] if cross_encoder_scores else None
        score = lexical_score + (semantic_score * 2.0 if semantic_score is not None else 0)
        content = str(item.get("content", "")).strip()
        ranked.append(
            {
                **item,
                "content": content if len(content) <= max_chars else f"{content[:max_chars]}...",
                "rerank_score": round(score, 4),
                "lexical_score": round(lexical_score, 4),
                "semantic_score": round(semantic_score, 4) if semantic_score is not None else None,
                "reranker": "cross_encoder" if semantic_score is not None else "lexical",
                "reranker_error": reranker_error,
                "original_index": index,
            }
        )
    ranked.sort(key=lambda item: item["rerank_score"], reverse=True)
    return ranked[:top_k]


def _cross_encoder_scores(query: str, evidence: list[dict[str, Any]]) -> tuple[list[float] | None, str | None]:
    if settings.reranker_provider.lower() != "cross_encoder" or not evidence:
        return None, None
    try:
        model = _load_cross_encoder(settings.cross_encoder_model)
        pairs = [
            (
                query,
                f"{item.get('title', '')}\n{str(item.get('content', ''))[:1200]}",
            )
            for item in evidence
        ]
        raw_scores = [float(score) for score in model.predict(pairs)]
        return _minmax(raw_scores), None
    except Exception as exc:  # pragma: no cover - depends on optional model runtime.
        return None, f"cross_encoder_fallback:{type(exc).__name__}"


@lru_cache(maxsize=2)
def _load_cross_encoder(model_name: str):
    from sentence_transformers import CrossEncoder

    return CrossEncoder(model_name)


def _minmax(values: list[float]) -> list[float]:
    if not values:
        return []
    low = min(values)
    high = max(values)
    if high == low:
        return [1.0 for _ in values]
    return [(value - low) / (high - low) for value in values]


def estimate_context_savings(raw_payload: Any, context_pack: dict[str, Any]) -> dict[str, int | float]:
    raw_tokens = max(1, len(_compact(raw_payload, 100_000)) // 4)
    packed_tokens = max(1, len(_compact(context_pack, 100_000)) // 4)
    return {
        "raw_estimated_tokens": raw_tokens,
        "packed_estimated_tokens": packed_tokens,
        "saved_tokens": max(0, raw_tokens - packed_tokens),
        "saving_rate": round(max(0.0, 1 - packed_tokens / raw_tokens) * 100, 2),
    }
