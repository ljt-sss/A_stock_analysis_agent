from pydantic import BaseModel
class EvalRun(BaseModel): case_ids: list[str] | None = None
