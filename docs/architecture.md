# 系统架构

前端通过 REST API 和 SSE 访问 FastAPI。结构化金融数据进入 PostgreSQL，文档 chunk 和 embedding 使用 pgvector；Redis 同时承担缓存、Celery broker 和 result backend。Celery 执行数据更新、财报处理、Agent 和评估任务，APScheduler 负责开发环境定时触发。

Provider 层隔离真实数据源；当前 `MockProvider` 可替换为 Tushare、AKShare 和 CNInfo。Agent 使用 LangGraph 编排，但任务长期状态、恢复和可视化均依赖数据库中的 `agent_task`、`agent_step` 和 `tool_call_log`。

