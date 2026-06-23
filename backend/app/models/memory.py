from datetime import datetime
from decimal import Decimal
from sqlalchemy import DateTime, JSON, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, TimestampMixin, UUIDMixin

class AgentMemory(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "agent_memory"
    scope: Mapped[str] = mapped_column(String(32)); memory_type: Mapped[str] = mapped_column(String(64)); ts_code: Mapped[str | None] = mapped_column(String(32)); title: Mapped[str | None] = mapped_column(String(256)); content: Mapped[str] = mapped_column(Text); source: Mapped[str | None] = mapped_column(String(64)); source_ref: Mapped[dict] = mapped_column(JSON, default=dict); confidence: Mapped[Decimal] = mapped_column(Numeric(5,2), default=0.5); status: Mapped[str] = mapped_column(String(32), default="active"); expires_at: Mapped[datetime | None] = mapped_column(DateTime)

