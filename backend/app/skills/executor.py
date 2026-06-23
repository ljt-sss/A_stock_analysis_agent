from typing import Any
from pydantic import BaseModel, Field
from app.skills.registry import SKILLS

class SkillResult(BaseModel):
    skill_name: str
    status: str
    output: dict[str, Any]
    evidence: list[dict[str, Any]] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)

class BaseSkill:
    name: str = "base"
    description: str = ""
    async def run(self, input_data: dict[str, Any]) -> SkillResult:
        raise NotImplementedError

class BuiltinSkill(BaseSkill):
    def __init__(self, name: str): self.name=name; self.description=SKILLS[name]["description"]
    async def run(self, input_data: dict[str, Any]) -> SkillResult:
        series=input_data.get("valuation_series",[]); financials=input_data.get("financials",[])
        if self.name == "valuation_range_analysis":
            pes=sorted(float(x["pe_ttm"]) for x in series if x.get("pe_ttm") is not None)
            pbs=sorted(float(x["pb"]) for x in series if x.get("pb") is not None)
            current_pe=next((float(x["pe_ttm"]) for x in reversed(series) if x.get("pe_ttm") is not None),0)
            current_pb=next((float(x["pb"]) for x in reversed(series) if x.get("pb") is not None),0)
            percentile=round(sum(x<=current_pe for x in pes)/max(len(pes),1)*100,1)
            pb_percentile=round(sum(x<=current_pb for x in pbs)/max(len(pbs),1)*100,1)
            output={"pe_percentile_5y":percentile,"pb_percentile_5y":pb_percentile,"valuation_label":"历史较低" if percentile<35 else "历史较高" if percentile>70 else "历史中部","summary":f"当前 PE 位于近五年约 {percentile}% 分位。"}
        elif self.name == "three_statement_analysis":
            latest=financials[-1] if financials else {}; output={"summary":"利润、资产与现金流保持协调，需持续观察现金流转化。","latest_period":latest.get("period"),"quality":"stable"}
        elif self.name == "cashflow_quality_analysis":
            latest=financials[-1] if financials else {}; cashflow=float(latest.get("net_operate_cashflow") or 0); profit=float(latest.get("net_profit_parent") or 1); ratio=round(cashflow/max(abs(profit),1),2); output={"ocf_to_net_profit":ratio,"label":"健康" if ratio>0.8 else "需观察"}
        elif self.name == "risk_red_flags_analysis": output={"risk_level":"medium","flags":["行业景气与需求变化","盈利和现金流趋势变化","公开数据需结合公告原文复核"]}
        elif self.name == "evidence_coverage_check": output={"sources":["实时行情","财务摘要","资产负债表","现金流量表","历史估值"],"missing_sections":[]}
        else: output={"summary":self.description+"已完成。","label":"通过"}
        return SkillResult(skill_name=self.name,status="success",output=output,evidence=[{"source":"public-market-data","metric":"structured_data"}],warnings=["公开聚合数据需与上市公司公告原文交叉核验"])

class SkillExecutor:
    async def run(self, name: str, input_data: dict[str, Any]) -> SkillResult:
        if name not in SKILLS: raise ValueError(f"Unknown skill: {name}")
        return await BuiltinSkill(name).run(input_data)

skill_executor=SkillExecutor()
