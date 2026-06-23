from datetime import datetime
import uuid
from decimal import Decimal
from sqlalchemy import Boolean, DateTime, ForeignKey, JSON, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, UUIDMixin

class EvalCase(UUIDMixin, Base):
    __tablename__ = "eval_case"
    case_id: Mapped[str] = mapped_column(String(64), unique=True); name: Mapped[str] = mapped_column(String(256)); task_type: Mapped[str | None] = mapped_column(String(64)); input: Mapped[dict] = mapped_column(JSON); expected_checks: Mapped[dict] = mapped_column(JSON, default=dict); skill_name: Mapped[str | None] = mapped_column(String(128)); is_active: Mapped[bool] = mapped_column(Boolean, default=True); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class EvalResult(UUIDMixin, Base):
    __tablename__ = "eval_result"
    eval_case_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("eval_case.id")); task_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("agent_task.id")); score: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); data_accuracy: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); retrieval_hit_rate: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); citation_coverage: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); hallucination_rate: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); tool_success_rate: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); completeness: Mapped[Decimal | None] = mapped_column(Numeric(6,2)); status: Mapped[str | None] = mapped_column(String(32)); failure_reasons: Mapped[list] = mapped_column(JSON, default=list); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
