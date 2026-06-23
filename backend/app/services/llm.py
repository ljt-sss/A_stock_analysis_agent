from __future__ import annotations

import httpx

from app.core.config import settings


class LlmError(RuntimeError):
    pass


def llm_enabled() -> bool:
    return settings.llm_provider == "openai_compat" and bool(settings.openai_compat_api_key)


async def generate_text(system_prompt: str, user_prompt: str) -> str:
    if settings.llm_provider == "mock":
        raise LlmError("LLM_PROVIDER=mock，未启用真实模型")
    if settings.llm_provider != "openai_compat":
        raise LlmError(f"不支持的 LLM_PROVIDER: {settings.llm_provider}")
    if not settings.openai_compat_api_key:
        raise LlmError("缺少 OPENAI_COMPAT_API_KEY")

    url = f"{settings.openai_compat_base_url.rstrip('/')}/chat/completions"
    payload = {
        "model": settings.openai_compat_default_model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
        "stream": False,
    }
    headers = {"Authorization": f"Bearer {settings.openai_compat_api_key}"}

    try:
        async with httpx.AsyncClient(timeout=settings.llm_timeout_seconds) as client:
            response = await client.post(url, json=payload, headers=headers)
    except httpx.HTTPError as exc:
        raise LlmError(f"模型服务连接失败: {exc}") from exc

    if response.is_error:
        detail = response.text[:500]
        raise LlmError(f"模型服务返回 HTTP {response.status_code}: {detail}")

    try:
        content = response.json()["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError, ValueError) as exc:
        raise LlmError("模型响应格式不符合 OpenAI-compatible 规范") from exc
    if not isinstance(content, str) or not content.strip():
        raise LlmError("模型返回了空内容")
    return content.strip()
