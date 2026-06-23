from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.stock import InvestmentThesis, WatchlistGroup, WatchlistStock
from app.services.stocks.mock_data import stock_by_code

router=APIRouter(prefix="/watchlists",tags=["watchlists"])
class GroupBody(BaseModel): name:str; description:str|None=None; color:str="#2563eb"
class StockBody(BaseModel): ts_code:str; priority:str="normal"; added_reason:str|None=None
class ThesisBody(BaseModel): thesis:str; key_assumptions:list[str]=[]; watch_indicators:list[str]=[]; confidence:float=0.8

@router.get("/groups")
def groups(db:Session=Depends(get_db)):
    result=[]
    for group in db.scalars(select(WatchlistGroup).order_by(WatchlistGroup.sort_order)).all():
        count=len(db.scalars(select(WatchlistStock).where(WatchlistStock.group_id==group.id)).all())
        result.append({"id":str(group.id),"name":group.name,"description":group.description,"color":group.color,"stock_count":count})
    return result
@router.post("/groups")
def create_group(body:GroupBody,db:Session=Depends(get_db)):
    item=WatchlistGroup(**body.model_dump()); db.add(item); db.commit(); db.refresh(item); return {"id":str(item.id),**body.model_dump()}
@router.put("/groups/{group_id}")
def update_group(group_id:UUID,body:GroupBody,db:Session=Depends(get_db)):
    item=db.get(WatchlistGroup,group_id)
    if not item: raise HTTPException(404,"Group not found")
    for key,value in body.model_dump().items(): setattr(item,key,value)
    db.commit(); return {"status":"success"}
@router.delete("/groups/{group_id}")
def delete_group(group_id:UUID,db:Session=Depends(get_db)):
    item=db.get(WatchlistGroup,group_id)
    if not item: raise HTTPException(404,"Group not found")
    db.delete(item); db.commit(); return {"status":"deleted"}
@router.get("/groups/{group_id}/stocks")
def group_stocks(group_id:UUID,db:Session=Depends(get_db)):
    items=[]
    for row in db.scalars(select(WatchlistStock).where(WatchlistStock.group_id==group_id)).all(): items.append({"id":str(row.id),"group_id":str(row.group_id),"priority":row.priority,"status":row.status,"added_reason":row.added_reason,"latest_report_period":row.latest_report_period,"next_review_at":row.next_review_at,"stock":stock_by_code(row.ts_code)})
    return jsonable_encoder(items)
@router.post("/groups/{group_id}/stocks")
def add_stock(group_id:UUID,body:StockBody,db:Session=Depends(get_db)):
    item=WatchlistStock(group_id=group_id,**body.model_dump()); db.add(item); db.commit(); return {"id":str(item.id),"status":"created"}
@router.delete("/groups/{group_id}/stocks/{ts_code}")
def remove_stock(group_id:UUID,ts_code:str,db:Session=Depends(get_db)):
    item=db.scalar(select(WatchlistStock).where(WatchlistStock.group_id==group_id,WatchlistStock.ts_code==ts_code))
    if item: db.delete(item); db.commit()
    return {"status":"deleted"}
@router.put("/stocks/{watchlist_stock_id}/thesis")
def update_thesis(watchlist_stock_id:UUID,body:ThesisBody,db:Session=Depends(get_db)):
    watch=db.get(WatchlistStock,watchlist_stock_id)
    if not watch: raise HTTPException(404,"Watchlist stock not found")
    thesis=db.scalar(select(InvestmentThesis).where(InvestmentThesis.ts_code==watch.ts_code))
    if not thesis: thesis=InvestmentThesis(ts_code=watch.ts_code,title="长期投资假设",thesis=body.thesis); db.add(thesis)
    thesis.thesis=body.thesis; thesis.key_assumptions=body.key_assumptions; thesis.watch_indicators=body.watch_indicators; thesis.confidence=body.confidence; db.commit(); return {"status":"success"}

