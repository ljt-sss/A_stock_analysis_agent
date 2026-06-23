# 数据库

模型按领域拆分：`stock.py`、`financial.py`、`report.py`、`wiki.py`、`memory.py`、`agent.py`、`eval.py`。全部外部数据保留 `source` 与 `fetched_at`，Agent 报告通过 `analysis_evidence` 追溯证据，长期记忆保留 scope、confidence、status 和 expires_at。

初始迁移位于 `backend/alembic/versions/0001_initial.py`，启动时也会幂等创建 pgvector 扩展和缺失表。

