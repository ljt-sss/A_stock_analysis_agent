from datetime import date, datetime
import uuid
from decimal import Decimal
from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, UUIDMixin

class FinancialIncomeStatement(UUIDMixin, Base):
    __tablename__ = "financial_income_statement"; __table_args__ = (UniqueConstraint("ts_code", "report_period"),)
    ts_code: Mapped[str] = mapped_column(String(32)); report_period: Mapped[str] = mapped_column(String(16)); report_date: Mapped[date | None] = mapped_column(Date)
    report_type: Mapped[str | None] = mapped_column(String(16)); revenue: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    operating_profit: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); total_profit: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    net_profit: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); net_profit_parent: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    net_profit_deducted: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); eps_basic: Mapped[Decimal | None] = mapped_column(Numeric(18,4))
    source: Mapped[str | None] = mapped_column(String(64)); fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class FinancialBalanceSheet(UUIDMixin, Base):
    __tablename__ = "financial_balance_sheet"; __table_args__ = (UniqueConstraint("ts_code", "report_period"),)
    ts_code: Mapped[str] = mapped_column(String(32)); report_period: Mapped[str] = mapped_column(String(16))
    total_assets: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); total_liabilities: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    equity_parent: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); monetary_funds: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    accounts_receivable: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); inventories: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    goodwill: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); short_term_borrowing: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    long_term_borrowing: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); contract_liabilities: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    source: Mapped[str | None] = mapped_column(String(64)); fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class FinancialCashflowStatement(UUIDMixin, Base):
    __tablename__ = "financial_cashflow_statement"; __table_args__ = (UniqueConstraint("ts_code", "report_period"),)
    ts_code: Mapped[str] = mapped_column(String(32)); report_period: Mapped[str] = mapped_column(String(16))
    net_operate_cashflow: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); net_invest_cashflow: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    net_finance_cashflow: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); capex: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    free_cashflow: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); cash_received_from_sales: Mapped[Decimal | None] = mapped_column(Numeric(24,4))
    source: Mapped[str | None] = mapped_column(String(64)); fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class FinancialIndicator(UUIDMixin, Base):
    __tablename__ = "financial_indicators"; __table_args__ = (UniqueConstraint("ts_code", "report_period"),)
    ts_code: Mapped[str] = mapped_column(String(32)); report_period: Mapped[str] = mapped_column(String(16))
    gross_margin: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); net_margin: Mapped[Decimal | None] = mapped_column(Numeric(10,4))
    roe: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); roa: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); roic: Mapped[Decimal | None] = mapped_column(Numeric(10,4))
    debt_asset_ratio: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); current_ratio: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); quick_ratio: Mapped[Decimal | None] = mapped_column(Numeric(10,4))
    ocf_to_net_profit: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); revenue_yoy: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); net_profit_yoy: Mapped[Decimal | None] = mapped_column(Numeric(10,4))
    deducted_profit_yoy: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); asset_turnover: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); inventory_turnover: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); ar_turnover: Mapped[Decimal | None] = mapped_column(Numeric(10,4))
    source: Mapped[str | None] = mapped_column(String(64)); fetched_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class BusinessSegment(UUIDMixin, Base):
    __tablename__ = "business_segment"
    ts_code: Mapped[str] = mapped_column(String(32)); report_period: Mapped[str] = mapped_column(String(16)); segment_name: Mapped[str] = mapped_column(String(128))
    revenue: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); revenue_ratio: Mapped[Decimal | None] = mapped_column(Numeric(10,4)); gross_profit: Mapped[Decimal | None] = mapped_column(Numeric(24,4)); gross_margin: Mapped[Decimal | None] = mapped_column(Numeric(10,4))
    source_report_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("company_report.id")); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
