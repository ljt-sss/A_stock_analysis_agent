from fastapi import APIRouter, HTTPException, Query
from app.services.stocks.real_data import RealDataError, dashboard, search_stocks as search_real_stocks

router=APIRouter(prefix="/stocks",tags=["stocks"])

@router.get("/search")
def search_stocks(keyword: str=Query("")):
    try: return search_real_stocks(keyword)
    except RealDataError as exc: raise HTTPException(502,str(exc)) from exc

@router.get("/{ts_code}")
def get_stock(ts_code: str):
    try:
        data=dashboard(ts_code); return data["stock"] | data["summary"]
    except RealDataError as exc: raise HTTPException(502,str(exc)) from exc

@router.get("/{ts_code}/dashboard")
def get_dashboard(ts_code: str):
    try: return dashboard(ts_code)
    except RealDataError as exc: raise HTTPException(502,str(exc)) from exc

@router.get("/{ts_code}/valuation")
def get_valuation(ts_code: str,years:int=5): return get_dashboard(ts_code)["valuation_series"]

@router.get("/{ts_code}/financials")
def get_financials(ts_code: str,periods:int=20): return get_dashboard(ts_code)["quarterly_financials"][-periods:]

@router.get("/{ts_code}/segments")
def get_segments(ts_code: str): return []

@router.get("/{ts_code}/peers")
def get_peers(ts_code: str): return []
