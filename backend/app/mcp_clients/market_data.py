from app.mcp_clients.base import LocalMcpClient
from app.services.stocks.mock_data import STOCKS, stock_by_code, valuation_series
class MarketDataMcp(LocalMcpClient):
    service_name="market-data-mcp"; tools=["search_stock","get_price_history","get_valuation_history","get_market_cap_history","get_sector_index"]
    async def call(self, tool_name, args):
        if tool_name=="search_stock": return {"items":[s for s in STOCKS if args.get("keyword","") in s["name"]+s["ts_code"]]}
        stock=stock_by_code(args.get("ts_code","600519.SH")); return {"items":valuation_series(stock),"source":"mock-provider"}
market_data_mcp=MarketDataMcp()

