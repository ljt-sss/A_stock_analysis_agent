from datetime import date, datetime
import uuid
from decimal import Decimal
from sqlalchemy import Date, DateTime, ForeignKey, Integer, JSON, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from pgvector.sqlalchemy import Vector
from app.models.base import Base, TimestampMixin, UUIDMixin

class CompanyReport(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "company_report"; __table_args__ = (UniqueConstraint("ts_code", "report_type", "report_period", "title"),)
    ts_code: Mapped[str] = mapped_column(String(32)); report_type: Mapped[str] = mapped_column(String(32)); report_period: Mapped[str | None] = mapped_column(String(16))
    title: Mapped[str | None] = mapped_column(String(512)); publish_date: Mapped[date | None] = mapped_column(Date); source: Mapped[str | None] = mapped_column(String(64)); source_url: Mapped[str | None] = mapped_column(Text)
    file_path: Mapped[str | None] = mapped_column(Text); parse_status: Mapped[str] = mapped_column(String(32), default="pending"); parse_progress: Mapped[Decimal] = mapped_column(Numeric(5,2), default=0)
    extraction_completeness: Mapped[Decimal | None] = mapped_column(Numeric(5,2)); summary: Mapped[str | None] = mapped_column(Text)

class ReportChunk(UUIDMixin, Base):
    __tablename__ = "report_chunk"
    report_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("company_report.id")); ts_code: Mapped[str] = mapped_column(String(32)); chunk_index: Mapped[int] = mapped_column(Integer)
    section_title: Mapped[str | None] = mapped_column(String(256)); page_start: Mapped[int | None] = mapped_column(Integer); page_end: Mapped[int | None] = mapped_column(Integer)
    content: Mapped[str] = mapped_column(Text); token_count: Mapped[int | None] = mapped_column(Integer); embedding: Mapped[list[float] | None] = mapped_column(Vector(1536)); meta: Mapped[dict] = mapped_column("metadata", JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class CompanyNews(UUIDMixin, Base):
    __tablename__ = "company_news"
    ts_code: Mapped[str | None] = mapped_column(String(32)); title: Mapped[str] = mapped_column(String(512)); content: Mapped[str | None] = mapped_column(Text); url: Mapped[str | None] = mapped_column(Text)
    source: Mapped[str | None] = mapped_column(String(64)); publish_time: Mapped[datetime | None] = mapped_column(DateTime); sentiment: Mapped[str | None] = mapped_column(String(32)); event_type: Mapped[str | None] = mapped_column(String(64)); entities: Mapped[list] = mapped_column(JSON, default=list); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class SectorHotEvent(UUIDMixin, Base):
    __tablename__ = "sector_hot_event"
    sector_name: Mapped[str] = mapped_column(String(128)); event_date: Mapped[date] = mapped_column(Date); heat_score: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); change_pct: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); turnover: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    reasons: Mapped[list] = mapped_column(JSON, default=list); related_stocks: Mapped[list] = mapped_column(JSON, default=list); evidence_news_ids: Mapped[list] = mapped_column(JSON, default=list); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class AnalysisReport(UUIDMixin, Base):
    __tablename__ = "analysis_report"
    task_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("agent_task.id")); ts_code: Mapped[str] = mapped_column(String(32)); report_type: Mapped[str] = mapped_column(String(64)); title: Mapped[str | None] = mapped_column(String(256)); summary: Mapped[str | None] = mapped_column(Text)
    conclusion: Mapped[str | None] = mapped_column(String(64)); content_md: Mapped[str] = mapped_column(Text); structured_result: Mapped[dict] = mapped_column(JSON, default=dict); disclaimer: Mapped[str] = mapped_column(Text, default="本报告仅基于公开数据生成，仅供研究参考，不构成投资建议。"); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class AnalysisEvidence(UUIDMixin, Base):
    __tablename__ = "analysis_evidence"
    report_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("analysis_report.id")); evidence_type: Mapped[str | None] = mapped_column(String(32)); source_id: Mapped[uuid.UUID | None] = mapped_column(nullable=True); source_url: Mapped[str | None] = mapped_column(Text); quote: Mapped[str | None] = mapped_column(Text); metric_name: Mapped[str | None] = mapped_column(String(128)); metric_value: Mapped[str | None] = mapped_column(String(128)); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
