from datetime import date, datetime
import uuid
from decimal import Decimal
from sqlalchemy import Date, DateTime, ForeignKey, Integer, JSON, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, TimestampMixin, UUIDMixin

class StockBasic(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "stock_basic"
    ts_code: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    symbol: Mapped[str] = mapped_column(String(16))
    name: Mapped[str] = mapped_column(String(128), index=True)
    exchange: Mapped[str | None] = mapped_column(String(16))
    market: Mapped[str | None] = mapped_column(String(32))
    industry: Mapped[str | None] = mapped_column(String(128))
    sector: Mapped[str | None] = mapped_column(String(128))
    list_date: Mapped[date | None] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(32), default="active")

class StockPriceDaily(UUIDMixin, Base):
    __tablename__ = "stock_price_daily"
    __table_args__ = (UniqueConstraint("ts_code", "trade_date"),)
    ts_code: Mapped[str] = mapped_column(String(32), index=True)
    trade_date: Mapped[date] = mapped_column(Date)
    open: Mapped[Decimal | None] = mapped_column(Numeric(18, 4)); high: Mapped[Decimal | None] = mapped_column(Numeric(18, 4))
    low: Mapped[Decimal | None] = mapped_column(Numeric(18, 4)); close: Mapped[Decimal | None] = mapped_column(Numeric(18, 4))
    pre_close: Mapped[Decimal | None] = mapped_column(Numeric(18, 4)); change: Mapped[Decimal | None] = mapped_column(Numeric(18, 4))
    pct_chg: Mapped[Decimal | None] = mapped_column(Numeric(10, 4)); volume: Mapped[Decimal | None] = mapped_column(Numeric(24, 4))
    amount: Mapped[Decimal | None] = mapped_column(Numeric(24, 4)); source: Mapped[str | None] = mapped_column(String(64))
    fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class StockValuationDaily(UUIDMixin, Base):
    __tablename__ = "stock_valuation_daily"
    __table_args__ = (UniqueConstraint("ts_code", "trade_date"),)
    ts_code: Mapped[str] = mapped_column(String(32), index=True); trade_date: Mapped[date] = mapped_column(Date)
    pe_ttm: Mapped[Decimal | None] = mapped_column(Numeric(18, 4)); pb: Mapped[Decimal | None] = mapped_column(Numeric(18, 4))
    ps_ttm: Mapped[Decimal | None] = mapped_column(Numeric(18, 4)); dividend_yield: Mapped[Decimal | None] = mapped_column(Numeric(18, 4))
    total_mv: Mapped[Decimal | None] = mapped_column(Numeric(24, 4)); circ_mv: Mapped[Decimal | None] = mapped_column(Numeric(24, 4))
    pe_percentile_5y: Mapped[Decimal | None] = mapped_column(Numeric(10, 4)); pb_percentile_5y: Mapped[Decimal | None] = mapped_column(Numeric(10, 4))
    source: Mapped[str | None] = mapped_column(String(64)); fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class WatchlistGroup(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "watchlist_group"
    name: Mapped[str] = mapped_column(String(128)); description: Mapped[str | None] = mapped_column(Text)
    color: Mapped[str | None] = mapped_column(String(32)); sort_order: Mapped[int] = mapped_column(Integer, default=0)

class WatchlistStock(UUIDMixin, Base):
    __tablename__ = "watchlist_stock"
    __table_args__ = (UniqueConstraint("group_id", "ts_code"),)
    group_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("watchlist_group.id")); ts_code: Mapped[str] = mapped_column(String(32))
    priority: Mapped[str] = mapped_column(String(32), default="normal"); status: Mapped[str] = mapped_column(String(32), default="tracking")
    added_reason: Mapped[str | None] = mapped_column(Text); latest_report_period: Mapped[str | None] = mapped_column(String(16))
    last_analysis_at: Mapped[datetime | None] = mapped_column(DateTime); next_review_at: Mapped[datetime | None] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class InvestmentThesis(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "investment_thesis"
    ts_code: Mapped[str] = mapped_column(String(32)); title: Mapped[str | None] = mapped_column(String(256)); thesis: Mapped[str] = mapped_column(Text)
    key_assumptions: Mapped[list] = mapped_column(JSON, default=list); watch_indicators: Mapped[list] = mapped_column(JSON, default=list)
    status: Mapped[str] = mapped_column(String(32), default="active"); confidence: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=0.5)
