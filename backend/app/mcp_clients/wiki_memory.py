from app.mcp_clients.base import LocalMcpClient
class WikiMemoryMcp(LocalMcpClient):
    service_name="wiki-memory-mcp"; tools=["search_wiki","get_company_wiki","update_company_wiki","get_stock_memory","update_stock_memory","get_investment_thesis","update_investment_thesis"]
    async def call(self,tool_name,args): return {"items":[{"title":"贵州茅台商业模式","content":"品牌壁垒、稀缺产能与经销体系构成长期竞争优势。"}],"source":"mock-wiki"}
wiki_memory_mcp=WikiMemoryMcp()

