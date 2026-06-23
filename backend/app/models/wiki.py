from datetime import datetime
import uuid
from sqlalchemy import DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from pgvector.sqlalchemy import Vector
from app.models.base import Base, TimestampMixin, UUIDMixin

class WikiPage(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "wiki_page"
    page_type: Mapped[str] = mapped_column(String(32)); title: Mapped[str] = mapped_column(String(256)); slug: Mapped[str] = mapped_column(String(256), unique=True); ts_code: Mapped[str | None] = mapped_column(String(32)); content_md: Mapped[str] = mapped_column(Text); version: Mapped[int] = mapped_column(Integer, default=1); freshness: Mapped[str] = mapped_column(String(32), default="unknown"); updated_by: Mapped[str] = mapped_column(String(64), default="agent")

class WikiChunk(UUIDMixin, Base):
    __tablename__ = "wiki_chunk"
    wiki_page_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("wiki_page.id")); chunk_index: Mapped[int] = mapped_column(Integer); heading: Mapped[str | None] = mapped_column(String(256)); content: Mapped[str] = mapped_column(Text); embedding: Mapped[list[float] | None] = mapped_column(Vector(1536)); meta: Mapped[dict] = mapped_column("metadata", JSON, default=dict); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
