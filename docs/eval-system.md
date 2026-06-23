# 评估体系

自定义评估覆盖 data_accuracy、retrieval_hit_rate、citation_coverage、hallucination_rate、tool_success_rate、completeness 和 task_recovery_rate。用例通过 `expected_checks` 声明必须章节、引用要求和禁用表达。

DeepEval 与 RAGAS 可在 `services/evals` 中后续实现，不影响当前 mock 评估运行。
