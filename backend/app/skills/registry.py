SKILLS = {
    "valuation_range_analysis": {"title":"五年估值区间分析","description":"计算 PE/PB 历史分位并判断估值位置","category":"估值"},
    "three_statement_analysis": {"title":"财报三表联动分析","description":"联动利润表、资产负债表和现金流量表","category":"财务"},
    "dupont_analysis": {"title":"杜邦分析","description":"拆解净利率、周转率和权益乘数","category":"盈利"},
    "cashflow_quality_analysis": {"title":"现金流质量分析","description":"检查利润与经营现金流匹配度","category":"现金流"},
    "business_segment_analysis": {"title":"主营业务结构分析","description":"分析收入结构与业务集中度","category":"业务"},
    "peer_comparison_analysis": {"title":"同行对比分析","description":"对比估值、盈利与成长指标","category":"对比"},
    "risk_red_flags_analysis": {"title":"风险红旗分析","description":"识别应收、存货、商誉与负债风险","category":"风险"},
    "investment_thesis_check": {"title":"投资假设验证","description":"用最新证据验证或削弱长期假设","category":"跟踪"},
    "sector_heat_reasoning": {"title":"板块热点归因","description":"聚类新闻并解释板块热度来源","category":"新闻"},
    "evidence_coverage_check": {"title":"证据覆盖检查","description":"检查关键结论的引用覆盖率","category":"评估"},
}

def list_skills() -> list[dict]:
    return [{"name":name, **item, "status":"active", "success_rate":round(90.3+i*0.7,1), "avg_latency_ms":2310+i*130} for i,(name,item) in enumerate(SKILLS.items())]

