from pydantic import BaseModel
class WikiUpdate(BaseModel): content_md: str
class MemoryCreate(BaseModel):
    scope: str; memory_type: str; content: str; ts_code: str | None = None; title: str | None = None; confidence: float = 0.8

