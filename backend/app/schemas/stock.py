from pydantic import BaseModel

class StockSearchItem(BaseModel):
    ts_code: str; symbol: str; name: str; exchange: str; industry: str | None = None; sector: str | None = None

class FundamentalTaskCreate(BaseModel):
    ts_code: str
    report_period: str | None = None
    user_question: str | None = None

