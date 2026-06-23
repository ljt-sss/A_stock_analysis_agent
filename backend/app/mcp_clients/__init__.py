from app.mcp_clients.market_data import market_data_mcp
from app.mcp_clients.financial_report import financial_report_mcp
from app.mcp_clients.news_sector import news_sector_mcp
from app.mcp_clients.wiki_memory import wiki_memory_mcp
MCP_CLIENTS={c.service_name:c for c in [market_data_mcp,financial_report_mcp,news_sector_mcp,wiki_memory_mcp]}

