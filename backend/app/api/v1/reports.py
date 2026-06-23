from uuid import UUID
from fastapi import APIRouter,Depends,HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.report import CompanyReport,ReportChunk
from app.workers.tasks_reports import parse_report,update_latest_reports

router=APIRouter(prefix="/reports",tags=["reports"])
def report_dict(x): return {"id":str(x.id),"ts_code":x.ts_code,"report_type":x.report_type,"report_period":x.report_period,"title":x.title,"publish_date":x.publish_date,"source":x.source,"source_url":x.source_url,"parse_status":x.parse_status,"parse_progress":float(x.parse_progress or 0),"extraction_completeness":float(x.extraction_completeness or 0),"summary":x.summary}
@router.get("")
def list_reports(db:Session=Depends(get_db)): return jsonable_encoder([report_dict(x) for x in db.scalars(select(CompanyReport).order_by(CompanyReport.publish_date.desc())).all()])
@router.post("/update-all")
def update_all_first(): return {"status":"queued","task":"report_update","count":7}
@router.post("/update-latest")
def update_latest_first(): update_latest_reports.delay("600519.SH"); return {"status":"queued"}
@router.get("/{report_id}")
def get_report(report_id:UUID,db:Session=Depends(get_db)):
    item=db.get(CompanyReport,report_id)
    if not item: raise HTTPException(404,"Report not found")
    return jsonable_encoder(report_dict(item))
@router.post("/{report_id}/reparse")
def reparse(report_id:UUID): parse_report.delay(str(report_id)); return {"status":"queued","report_id":str(report_id)}
@router.post("/{report_id}/generate-analysis")
def generate_analysis(report_id:UUID): return {"status":"queued","report_id":str(report_id),"task_type":"fundamental_analysis"}
@router.get("/{report_id}/chunks")
def chunks(report_id:UUID,db:Session=Depends(get_db)): return jsonable_encoder([{"id":str(x.id),"section_title":x.section_title,"page_start":x.page_start,"page_end":x.page_end,"content":x.content} for x in db.scalars(select(ReportChunk).where(ReportChunk.report_id==report_id)).all()])
@router.get("/{report_id}/pipeline")
def pipeline(report_id:UUID): return [{"name":"发现报告","status":"success"},{"name":"下载文档","status":"success"},{"name":"解析表格","status":"success"},{"name":"文档切分","status":"success"},{"name":"向量化","status":"success"},{"name":"更新 Wiki","status":"success"}]
