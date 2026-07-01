from __future__ import annotations

import re
from typing import Any


FORBIDDEN_CLAIMS = ("建议买入", "强烈推荐", "目标价", "保证收益")


def evaluate_report(report: str, evidence: list[dict[str, Any]], skill_results: list[dict[str, Any]]) -> dict[str, Any]:
    numbers = re.findall(r"(?<![A-Za-z])\d+(?:\.\d+)?%?", report)
    evidence_text = " ".join(str(item.get("content", "")) for item in evidence)
    supported = sum(1 for number in numbers if number in evidence_text)
    forbidden = [claim for claim in FORBIDDEN_CLAIMS if claim in report]
    tool_successes = sum(1 for item in skill_results if item.get("status") == "success")
    data_accuracy = supported / max(len(numbers), 1) * 100
    citation_coverage = min(100.0, len(evidence) / 4 * 100)
    tool_success_rate = tool_successes / max(len(skill_results), 1) * 100
    hallucination_rate = min(100.0, (len(numbers) - supported + len(forbidden) * 2) / max(len(numbers), 1) * 100)
    failure_reasons = []
    if data_accuracy < 80:
        failure_reasons.append("报告数字与证据账本匹配率不足")
    if citation_coverage < 75:
        failure_reasons.append("证据来源覆盖不足")
    if forbidden:
        failure_reasons.append(f"出现禁止性表述: {', '.join(forbidden)}")
    score = data_accuracy * 0.4 + citation_coverage * 0.25 + tool_success_rate * 0.25 + (100 - hallucination_rate) * 0.1
    return {
        "score": round(score, 2),
        "data_accuracy": round(data_accuracy, 2),
        "retrieval_hit_rate": round(min(100.0, len(evidence) / 3 * 100), 2),
        "citation_coverage": round(citation_coverage, 2),
        "hallucination_rate": round(hallucination_rate, 2),
        "tool_success_rate": round(tool_success_rate, 2),
        "completeness": 100.0 if all(section in report for section in ("风险", "估值")) else 75.0,
        "status": "passed" if not failure_reasons else "review",
        "failure_reasons": failure_reasons,
    }
