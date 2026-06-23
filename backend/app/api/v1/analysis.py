from fastapi import APIRouter,Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.report import AnalysisReport

router=APIRouter(prefix="/analysis",tags=["analysis"])
@router.get("/reports")
def reports(ts_code:str|None=None,db:Session=Depends(get_db)):
    q=select(AnalysisReport)
    if ts_code:q=q.where(AnalysisReport.ts_code==ts_code)
    return jsonable_encoder([{"id":str(x.id),"task_id":str(x.task_id) if x.task_id else None,"ts_code":x.ts_code,"title":x.title,"summary":x.summary,"conclusion":x.conclusion,"content_md":x.content_md,"structured_result":x.structured_result,"disclaimer":x.disclaimer,"created_at":x.created_at} for x in db.scalars(q.order_by(AnalysisReport.created_at.desc())).all()])

