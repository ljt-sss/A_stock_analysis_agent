from pydantic import BaseModel
class ReportAction(BaseModel): ts_code: str | None = None

