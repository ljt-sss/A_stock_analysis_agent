import asyncio
from app.skills.executor import skill_executor
def test_valuation_skill():
    result=asyncio.run(skill_executor.run("valuation_range_analysis",{"valuation_series":[{"pe_ttm":10},{"pe_ttm":20}]}))
    assert result.status=="success"
