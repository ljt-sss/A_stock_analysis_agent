from datetime import datetime
import uuid
from decimal import Decimal
from sqlalchemy import DateTime, ForeignKey, Index, Integer, JSON, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, UUIDMixin

class AgentTask(UUIDMixin, Base):
    __tablename__ = "agent_task"
    task_type: Mapped[str] = mapped_column(String(64)); title: Mapped[str] = mapped_column(String(256)); ts_code: Mapped[str | None] = mapped_column(String(32)); input: Mapped[dict] = mapped_column(JSON, default=dict); status: Mapped[str] = mapped_column(String(32), default="pending"); current_step: Mapped[str | None] = mapped_column(String(128)); progress: Mapped[Decimal] = mapped_column(Numeric(5,2), default=0); result: Mapped[dict] = mapped_column(JSON, default=dict); error_message: Mapped[str | None] = mapped_column(Text); retry_count: Mapped[int] = mapped_column(Integer, default=0); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow); started_at: Mapped[datetime | None] = mapped_column(DateTime); finished_at: Mapped[datetime | None] = mapped_column(DateTime)

class AgentStep(UUIDMixin, Base):
    __tablename__ = "agent_step"
    task_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("agent_task.id")); step_name: Mapped[str] = mapped_column(String(128)); step_order: Mapped[int] = mapped_column(Integer); status: Mapped[str] = mapped_column(String(32), default="pending"); input: Mapped[dict] = mapped_column(JSON, default=dict); output: Mapped[dict] = mapped_column(JSON, default=dict); error_message: Mapped[str | None] = mapped_column(Text); retry_count: Mapped[int] = mapped_column(Integer, default=0); started_at: Mapped[datetime | None] = mapped_column(DateTime); finished_at: Mapped[datetime | None] = mapped_column(DateTime)

class ToolCallLog(UUIDMixin, Base):
    __tablename__ = "tool_call_log"
    task_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("agent_task.id")); step_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("agent_step.id")); tool_name: Mapped[str] = mapped_column(String(128)); tool_type: Mapped[str] = mapped_column(String(32)); input: Mapped[dict] = mapped_column(JSON, default=dict); output: Mapped[dict] = mapped_column(JSON, default=dict); status: Mapped[str] = mapped_column(String(32), default="success"); latency_ms: Mapped[int | None] = mapped_column(Integer); error_message: Mapped[str | None] = mapped_column(Text); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class AgentCheckpoint(UUIDMixin, Base):
    __tablename__ = "agent_checkpoint"
    __table_args__ = (Index("ix_agent_checkpoint_task_order", "task_id", "step_order"),)
    task_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("agent_task.id")); step_name: Mapped[str] = mapped_column(String(128)); step_order: Mapped[int] = mapped_column(Integer); state: Mapped[dict] = mapped_column(JSON, default=dict); output: Mapped[dict] = mapped_column(JSON, default=dict); status: Mapped[str] = mapped_column(String(32), default="success"); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
