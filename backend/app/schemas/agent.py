from pydantic import BaseModel
class ToolRunRequest(BaseModel):
    input: dict = {}
class TaskCreate(BaseModel):
    ts_code: str
    report_period: str | None = None

