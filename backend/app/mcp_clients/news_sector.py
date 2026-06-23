from app.mcp_clients.base import LocalMcpClient
class NewsSectorMcp(LocalMcpClient):
    service_name="news-sector-mcp"; tools=["search_company_news","search_sector_news","get_sector_heat_rank","cluster_news_events","analyze_sector_heat_reason"]
    async def call(self,tool_name,args): return {"items":[{"sector":"低空经济","heat_score":92.4,"reason":"政策催化与产业订单预期"},{"sector":"食品饮料","heat_score":78.6,"reason":"渠道库存边际改善"}],"source":"mock-news"}
news_sector_mcp=NewsSectorMcp()

