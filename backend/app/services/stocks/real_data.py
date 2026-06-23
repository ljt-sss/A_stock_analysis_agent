from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from functools import lru_cache
from math import isnan
from typing import Any

import akshare as ak
import httpx
import pandas as pd


class RealDataError(RuntimeError):
    pass


def normalize_ts_code(value: str) -> str:
    raw = value.strip().upper()
    if "." in raw:
        code, suffix = raw.split(".", 1)
        suffix = {"SSE": "SH", "SZSE": "SZ", "BSE": "BJ"}.get(suffix, suffix)
        return f"{code}.{suffix}"
    code = "".join(ch for ch in raw if ch.isdigit())
    if len(code) != 6:
        raise RealDataError("请输入 6 位 A 股代码")
    suffix = "SH" if code.startswith(("5", "6", "9")) else "BJ" if code.startswith(("4", "8")) else "SZ"
    return f"{code}.{suffix}"


def _clean_number(value: Any, digits: int = 2) -> float | None:
    try:
        number = float(value)
        if isnan(number):
            return None
        return round(number, digits)
    except (TypeError, ValueError):
        return None


@lru_cache(maxsize=1)
def _stock_list() -> list[dict[str, str]]:
    try:
        frame = ak.stock_info_a_code_name()
    except Exception as exc:
        raise RealDataError(f"股票列表获取失败: {exc}") from exc
    return [{"code": str(row["code"]).zfill(6), "name": str(row["name"]).strip()} for _, row in frame.iterrows()]


def search_stocks(keyword: str, limit: int = 20) -> list[dict]:
    query = keyword.strip().lower()
    if not query:
        return []
    exact, fuzzy = [], []
    for item in _stock_list():
        if query not in f"{item['code']} {item['name']}".lower():
            continue
        target = exact if query in {item["code"].lower(), item["name"].lower()} else fuzzy
        ts_code = normalize_ts_code(item["code"])
        target.append({
            "ts_code": ts_code,
            "symbol": item["code"],
            "name": item["name"],
            "exchange": ts_code.split(".")[1],
            "data_source": "AKShare 股票列表",
        })
    return (exact + fuzzy)[:limit]


def _stock_name(symbol: str) -> str:
    return next((item["name"] for item in _stock_list() if item["code"] == symbol), symbol)


def _quote(ts_code: str) -> dict:
    code, suffix = ts_code.split(".")
    prefix = {"SH": "sh", "SZ": "sz", "BJ": "bj"}[suffix]
    try:
        response = httpx.get(f"https://qt.gtimg.cn/q={prefix}{code}", timeout=20)
        response.raise_for_status()
        parts = response.content.decode("gbk").split('"')[1].split("~")
        if len(parts) < 50 or not parts[1]:
            raise ValueError("返回内容为空")
    except Exception as exc:
        raise RealDataError(f"实时行情获取失败: {exc}") from exc
    return {
        "name": parts[1],
        "price": _clean_number(parts[3]),
        "pct_chg": _clean_number(parts[32]),
        "pe_ttm": _clean_number(parts[39]),
        "pb": _clean_number(parts[46]),
        "total_mv": _clean_number(parts[44]),
        "dividend_yield": _clean_number(parts[49]),
        "quote_time": datetime.strptime(parts[30], "%Y%m%d%H%M%S").isoformat() if parts[30] else None,
    }


def _metric(group: pd.DataFrame, name: str, field: str = "single") -> float | None:
    row = group[group["metric_name"] == name]
    if row.empty:
        return None
    value = row.iloc[0].get(field)
    if value in (None, "") and field != "value":
        value = row.iloc[0].get("value")
    return _clean_number(value)


def _financial_rows(abstract: pd.DataFrame, balance: pd.DataFrame, cash: pd.DataFrame) -> list[dict]:
    balance_by_date = {str(row["REPORT_DATE"])[:10]: row for _, row in balance.iterrows()}
    cash_rows = sorted((row for _, row in cash.iterrows()), key=lambda row: str(row["REPORT_DATE"]))
    cash_by_date: dict[str, float | None] = {}
    prior_by_year: dict[str, float] = {}
    for row in cash_rows:
        report_date = str(row["REPORT_DATE"])[:10]
        year = report_date[:4]
        cumulative = _clean_number(row.get("NETCASH_OPERATE"), 4)
        if cumulative is None:
            cash_by_date[report_date] = None
            continue
        single = cumulative if report_date[5:7] == "03" else cumulative - prior_by_year.get(year, 0)
        cash_by_date[report_date] = round(single / 1e8, 2)
        prior_by_year[year] = cumulative

    result = []
    dates = sorted(abstract["report_date"].astype(str).unique())[-20:]
    for report_date in dates:
        group = abstract[abstract["report_date"].astype(str) == report_date]
        balance_row = balance_by_date.get(report_date, {})
        month = int(report_date[5:7])
        quarter = {3: 1, 6: 2, 9: 3, 12: 4}.get(month, month // 3)
        total_assets = _clean_number(balance_row.get("TOTAL_ASSETS"), 4)
        total_liabilities = _clean_number(balance_row.get("TOTAL_LIABILITIES"), 4)
        parent_equity = _clean_number(balance_row.get("TOTAL_PARENT_EQUITY"), 4)
        result.append({
            "period": f"{report_date[:4]}Q{quarter}",
            "report_date": report_date,
            "revenue": _to_yi(_metric(group, "operating_income_total")),
            "net_profit_parent": _to_yi(_metric(group, "parent_holder_net_profit")),
            "revenue_yoy": _metric(group, "calculate_operating_income_total_yoy_growth_ratio"),
            "net_profit_yoy": _metric(group, "calculate_parent_holder_net_profit_yoy_growth_ratio"),
            "gross_margin": _metric(group, "sale_gross_margin"),
            "net_margin": _metric(group, "sale_net_interest_ratio"),
            "roe": _metric(group, "index_weighted_avg_roe"),
            "debt_asset_ratio": _metric(group, "assets_debt_ratio", "value"),
            "net_operate_cashflow": cash_by_date.get(report_date),
            "total_assets": round(total_assets / 1e8, 2) if total_assets is not None else None,
            "total_liabilities": round(total_liabilities / 1e8, 2) if total_liabilities is not None else None,
            "equity_parent": round(parent_equity / 1e8, 2) if parent_equity is not None else None,
        })
    return result


def _to_yi(value: float | None) -> float | None:
    return round(value / 1e8, 2) if value is not None else None


def _valuation(symbol: str, indicator: str) -> pd.DataFrame:
    frame = ak.stock_zh_valuation_baidu(symbol=symbol, indicator=indicator, period="近五年")
    frame["date"] = frame["date"].astype(str).str[:10]
    return frame


def _valuation_rows(pe: pd.DataFrame, pb: pd.DataFrame, mv: pd.DataFrame) -> list[dict]:
    values: dict[str, dict[str, Any]] = {}
    for key, frame in (("pe_ttm", pe), ("pb", pb), ("total_mv", mv)):
        for _, row in frame.iterrows():
            values.setdefault(row["date"], {"date": row["date"]})[key] = _clean_number(row["value"])
    rows = sorted(values.values(), key=lambda item: item["date"])
    last: dict[str, float | None] = {"pe_ttm": None, "pb": None, "total_mv": None}
    for row in rows:
        for key in last:
            if key in row:
                last[key] = row[key]
            else:
                row[key] = last[key]
    complete = [row for row in rows if row.get("pe_ttm") is not None]
    step = max(1, len(complete) // 90)
    sampled = complete[::step]
    if complete and sampled[-1]["date"] != complete[-1]["date"]:
        sampled.append(complete[-1])
    return sampled


def dashboard(value: str) -> dict:
    ts_code = normalize_ts_code(value)
    symbol, suffix = ts_code.split(".")
    em_symbol = f"{suffix}{symbol}"
    try:
        with ThreadPoolExecutor(max_workers=7) as pool:
            futures = {
                "quote": pool.submit(_quote, ts_code),
                "abstract": pool.submit(ak.stock_financial_abstract_new_ths, symbol, "按报告期"),
                "balance": pool.submit(ak.stock_balance_sheet_by_report_em, em_symbol),
                "cash": pool.submit(ak.stock_cash_flow_sheet_by_report_em, em_symbol),
                "pe": pool.submit(_valuation, symbol, "市盈率(TTM)"),
                "pb": pool.submit(_valuation, symbol, "市净率"),
                "mv": pool.submit(_valuation, symbol, "总市值"),
            }
            loaded = {key: future.result() for key, future in futures.items()}
    except Exception as exc:
        if isinstance(exc, RealDataError):
            raise
        raise RealDataError(f"真实数据获取失败: {exc}") from exc

    quote = loaded["quote"]
    financials = _financial_rows(loaded["abstract"], loaded["balance"], loaded["cash"])
    if not financials:
        raise RealDataError("未获取到该公司的财务报表")
    valuation = _valuation_rows(loaded["pe"], loaded["pb"], loaded["mv"])
    latest = financials[-1]
    name = quote.get("name") or _stock_name(symbol)
    revenue_yoy = latest.get("revenue_yoy")
    profit_yoy = latest.get("net_profit_yoy")
    cashflow = latest.get("net_operate_cashflow")
    return {
        "stock": {"ts_code": ts_code, "symbol": symbol, "name": name, "exchange": suffix, "market": "A股"},
        "summary": {**{key: quote.get(key) for key in ("price", "pct_chg", "total_mv", "pe_ttm", "pb", "dividend_yield")}, "latest_report_period": latest["period"]},
        "valuation_series": valuation,
        "quarterly_financials": financials,
        "indicator_series": [{key: row.get(key) for key in ("period", "roe", "gross_margin", "net_margin", "debt_asset_ratio")} for row in financials],
        "business_segments": [],
        "peers": [],
        "agent_insight": {
            "valuation": {"label": "实时估值", "text": f"当前 PE-TTM {quote.get('pe_ttm') or '--'}，PB {quote.get('pb') or '--'}。"},
            "performance": {"label": "最新财报", "text": f"{latest['period']} 营收同比 {revenue_yoy if revenue_yoy is not None else '--'}%，归母净利润同比 {profit_yoy if profit_yoy is not None else '--'}%。"},
            "cashflow": {"label": "经营现金流", "text": f"最新单季经营现金流 {cashflow if cashflow is not None else '--'} 亿元。"},
            "risks": ["公开数据接口可能延迟或调整", "财务指标需结合公司公告原文复核"],
            "followups": ["关注下一期收入与利润增速", "跟踪经营现金流和资产负债率变化"],
        },
        "meta": {
            "is_real": True,
            "quote_time": quote.get("quote_time"),
            "generated_at": datetime.now().isoformat(timespec="seconds"),
            "sources": ["腾讯证券实时行情", "同花顺财务摘要（经 AKShare）", "东方财富三张表（经 AKShare）", "百度股市通估值（经 AKShare）"],
        },
    }
