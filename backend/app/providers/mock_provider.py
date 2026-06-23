from datetime import date
from app.providers.base import MarketDataProvider
from app.services.stocks.mock_data import STOCKS, dashboard, quarterly_financials, segments, stock_by_code, valuation_series

class MockProvider(MarketDataProvider):
    async def search_stock(self, keyword): return [s for s in STOCKS if keyword.lower() in (s["name"]+s["ts_code"]).lower()]
    async def get_stock_basic(self, ts_code): return stock_by_code(ts_code)
    async def get_daily_price(self, ts_code, start_date, end_date): return [{"trade_date":x["date"],"close":stock_by_code(ts_code)["price"]} for x in valuation_series(stock_by_code(ts_code))]
    async def get_daily_valuation(self, ts_code, start_date, end_date): return valuation_series(stock_by_code(ts_code))
    async def get_income_statement(self, ts_code, periods): return quarterly_financials(ts_code, periods)
    async def get_balance_sheet(self, ts_code, periods): return quarterly_financials(ts_code, periods)
    async def get_cashflow_statement(self, ts_code, periods): return quarterly_financials(ts_code, periods)
    async def get_financial_indicators(self, ts_code, periods): return quarterly_financials(ts_code, periods)
    async def get_business_segments(self, ts_code): return segments(ts_code)

mock_provider = MockProvider()

