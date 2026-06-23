# Agent 工作流

```text
check_data_freshness
  → load_stock_context
  → retrieve_evidence
  → run_financial_skills
  → generate_report
  → verify_evidence
  → update_memory
  → evaluate_output
```

每个节点更新 `agent_step`；MCP、Skill、RAG、SQL 和 LLM 调用写入 `tool_call_log`。最终输出 `analysis_report`、`analysis_evidence`、`agent_memory` 和 `eval_result`。

