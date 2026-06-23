# 五年估值区间分析
## name
valuation_range_analysis
## description
分析当前 PE-TTM、PB 和总市值在近五年历史区间的位置。
## inputs
- ts_code
- valuation_series
- current_valuation
## outputs
- pe_percentile_5y
- pb_percentile_5y
- valuation_label
- evidence
## steps
1. 计算历史统计值。
2. 计算当前分位数。
3. 输出证据和结论。
## guardrails
- 不输出买卖建议或目标价。
- 数据不足三年时必须提示。

