from __future__ import annotations
from datetime import date, timedelta
from math import sin

STOCKS = [
    {"ts_code":"600519.SH","symbol":"600519","name":"贵州茅台","exchange":"SSE","market":"主板","industry":"白酒","sector":"食品饮料","price":1645.30,"pct_chg":-0.65,"pe_ttm":20.79,"pb":8.59,"total_mv":20707,"dividend_yield":2.12,"latest_report_period":"2024Q1","status":"有新财报"},
    {"ts_code":"300750.SZ","symbol":"300750","name":"宁德时代","exchange":"SZSE","market":"创业板","industry":"电池","sector":"新能源","price":192.68,"pct_chg":1.28,"pe_ttm":18.31,"pb":4.12,"total_mv":8468,"dividend_yield":1.18,"latest_report_period":"2024Q1","status":"需复核"},
    {"ts_code":"601318.SH","symbol":"601318","name":"中国平安","exchange":"SSE","market":"主板","industry":"保险","sector":"非银金融","price":44.81,"pct_chg":0.22,"pe_ttm":6.32,"pb":0.82,"total_mv":8183,"dividend_yield":5.64,"latest_report_period":"2024Q1","status":"正常"},
    {"ts_code":"000333.SZ","symbol":"000333","name":"美的集团","exchange":"SZSE","market":"主板","industry":"家电","sector":"家用电器","price":71.26,"pct_chg":-0.07,"pe_ttm":13.21,"pb":2.34,"total_mv":4978,"dividend_yield":4.02,"latest_report_period":"2024Q1","status":"正常"},
    {"ts_code":"600036.SH","symbol":"600036","name":"招商银行","exchange":"SSE","market":"主板","industry":"银行","sector":"银行","price":34.56,"pct_chg":0.55,"pe_ttm":5.67,"pb":0.94,"total_mv":8701,"dividend_yield":5.31,"latest_report_period":"2024Q1","status":"有新财报"},
    {"ts_code":"000858.SZ","symbol":"000858","name":"五粮液","exchange":"SZSE","market":"主板","industry":"白酒","sector":"食品饮料","price":152.31,"pct_chg":0.31,"pe_ttm":14.66,"pb":5.91,"total_mv":5917,"dividend_yield":2.86,"latest_report_period":"2024Q1","status":"正常"},
    {"ts_code":"600809.SH","symbol":"600809","name":"山西汾酒","exchange":"SSE","market":"主板","industry":"白酒","sector":"食品饮料","price":236.05,"pct_chg":-0.18,"pe_ttm":25.38,"pb":7.16,"total_mv":2876,"dividend_yield":1.23,"latest_report_period":"2024Q1","status":"正常"},
]

def stock_by_code(ts_code: str) -> dict:
    return next((item for item in STOCKS if item["ts_code"] == ts_code), STOCKS[0])

def valuation_series(stock: dict, points: int = 60) -> list[dict]:
    end = date(2024, 5, 20); result = []
    for i in range(points):
        day = end - timedelta(days=(points - i - 1) * 30)
        wave = sin(i / 5) * 2.2 + sin(i / 11) * 1.1
        result.append({"date":day.isoformat(),"pe_ttm":round(stock["pe_ttm"] + wave + (points-i)*0.08,2),"pb":round(stock["pb"] + wave*0.18,2),"total_mv":round(stock["total_mv"]*(0.88+i*0.002+wave*0.005),2)})
    return result

def quarterly_financials(ts_code: str, periods: int = 20) -> list[dict]:
    stock = stock_by_code(ts_code); scale = stock["total_mv"] / 20707
    rows=[]
    for i in range(periods):
        year=2019+i//4; quarter=i%4+1; seasonal=[0.76,0.86,0.91,1.18][quarter-1]
        revenue=(265+i*7.8)*seasonal*scale; profit=revenue*(0.46+0.015*sin(i/3))
        rows.append({"period":f"{year}Q{quarter}","revenue":round(revenue,2),"net_profit_parent":round(profit,2),"revenue_yoy":round(8+6*sin(i/4),2),"net_profit_yoy":round(10+7*sin(i/5),2),"gross_margin":round(88+3*scale+sin(i/4),2),"net_margin":round(43+5*scale+sin(i/3),2),"roe":round(24+8*scale+sin(i/3)*2,2),"debt_asset_ratio":round(25+sin(i/5),2),"net_operate_cashflow":round(profit*(0.9+0.25*sin(i/2)),2),"total_assets":round((1800+i*95)*scale,2),"total_liabilities":round((450+i*25)*scale,2),"equity_parent":round((1350+i*70)*scale,2)})
    return rows

def segments(ts_code: str) -> list[dict]:
    stock=stock_by_code(ts_code)
    if stock["industry"] == "白酒": names=[("茅台酒",85.56,91.8),("系列酒",13.87,78.4),("其他",0.57,42.0)]
    else: names=[("核心业务",68.0,38.2),("成长业务",24.0,28.5),("其他",8.0,16.0)]
    return [{"segment_name":n,"revenue_ratio":r,"gross_margin":g} for n,r,g in names]

def dashboard(ts_code: str) -> dict:
    stock=stock_by_code(ts_code); financials=quarterly_financials(ts_code)
    return {"stock":{k:stock[k] for k in ["ts_code","symbol","name","exchange","market","industry","sector"]},"summary":{k:stock[k] for k in ["price","pct_chg","total_mv","pe_ttm","pb","dividend_yield","latest_report_period"]},"valuation_series":valuation_series(stock),"quarterly_financials":financials,"indicator_series":[{k:r[k] for k in ["period","roe","gross_margin","net_margin","debt_asset_ratio"]} for r in financials],"business_segments":segments(ts_code),"peers":[{k:s[k] for k in ["name","ts_code","price","total_mv","pe_ttm","pb","dividend_yield"]} | {"roe":round(22+s["pb"],2),"gross_margin":round(55+s["pb"]*4,2)} for s in STOCKS if s["sector"]==stock["sector"]][:4],"agent_insight":{"valuation":{"label":"合理偏低","text":"当前 PE-TTM 低于近五年均值，处于历史约 34% 分位。"},"performance":{"label":"优秀","text":"最近季度收入与利润保持增长，盈利能力稳定。"},"cashflow":{"label":"健康","text":"经营现金流与净利润匹配度良好。"},"risks":["行业需求波动","渠道库存变化","政策与食品安全风险"],"followups":["关注最新季度量价变化","关注经营现金流与合同负债","跟踪核心产品批价"]}}

