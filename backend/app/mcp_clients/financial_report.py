from app.mcp_clients.base import LocalMcpClient
from app.services.stocks.mock_data import quarterly_financials
class FinancialReportMcp(LocalMcpClient):
    service_name="financial-report-mcp"; tools=["get_income_statement","get_balance_sheet","get_cashflow_statement","get_financial_indicators","search_reports","parse_report"]
    async def call(self, tool_name,args): return {"items":quarterly_financials(args.get("ts_code","600519.SH"),args.get("periods",20)),"source":"mock-provider"}
financial_report_mcp=FinancialReportMcp()

