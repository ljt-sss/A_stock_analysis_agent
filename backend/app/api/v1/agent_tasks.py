import asyncio,json
from uuid import UUID
from fastapi import APIRouter,Depends,HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.agent import AgentStep,AgentTask,ToolCallLog
from app.schemas.stock import FundamentalTaskCreate
from app.workers.tasks_agent import generate_fundamental_analysis
from app.services.stocks.real_data import RealDataError, normalize_ts_code

router=APIRouter(prefix="/agent/tasks",tags=["agent"])
NODES=["check_data_freshness","load_stock_context","retrieve_evidence","run_financial_skills","generate_report","verify_evidence","update_memory","evaluate_output"]
def task_dict(x): return {"id":str(x.id),"task_type":x.task_type,"title":x.title,"ts_code":x.ts_code,"status":x.status,"current_step":x.current_step,"progress":float(x.progress or 0),"result":x.result,"error_message":x.error_message,"created_at":x.created_at,"started_at":x.started_at,"finished_at":x.finished_at}
@router.post("/fundamental-analysis")
def create_fundamental(body:FundamentalTaskCreate,db:Session=Depends(get_db)):
    try: ts_code=normalize_ts_code(body.ts_code)
    except RealDataError as exc: raise HTTPException(400,str(exc)) from exc
    task=AgentTask(task_type="fundamental_analysis",title=f"{ts_code} 基本面分析",ts_code=ts_code,input={**body.model_dump(),"ts_code":ts_code},status="pending",progress=0); db.add(task); db.flush()
    for i,name in enumerate(NODES): db.add(AgentStep(task_id=task.id,step_name=name,step_order=i+1,status="pending",input={"ts_code":ts_code}))
    db.commit(); db.refresh(task); generate_fundamental_analysis.delay(str(task.id),ts_code,body.report_period); return jsonable_encoder(task_dict(task))
@router.get("/{task_id}")
def get_task(task_id:UUID,db:Session=Depends(get_db)):
    item=db.get(AgentTask,task_id)
    if not item: raise HTTPException(404,"Task not found")
    return jsonable_encoder(task_dict(item))
@router.get("/{task_id}/steps")
def steps(task_id:UUID,db:Session=Depends(get_db)): return jsonable_encoder([{"id":str(x.id),"task_id":str(x.task_id),"step_name":x.step_name,"step_order":x.step_order,"status":x.status,"input":x.input,"output":x.output,"error_message":x.error_message,"started_at":x.started_at,"finished_at":x.finished_at} for x in db.scalars(select(AgentStep).where(AgentStep.task_id==task_id).order_by(AgentStep.step_order)).all()])
@router.get("/{task_id}/tool-calls")
def tool_calls(task_id:UUID,db:Session=Depends(get_db)): return jsonable_encoder([{"id":str(x.id),"tool_name":x.tool_name,"tool_type":x.tool_type,"status":x.status,"latency_ms":x.latency_ms,"input":x.input,"output":x.output,"created_at":x.created_at} for x in db.scalars(select(ToolCallLog).where(ToolCallLog.task_id==task_id).order_by(ToolCallLog.created_at)).all()])
@router.get("/{task_id}/stream")
async def stream(task_id:UUID):
    async def events():
        last=None
        for _ in range(120):
            db=next(get_db()); task=db.get(AgentTask,task_id); payload=task_dict(task) if task else {"status":"not_found"}; db.close()
            current=json.dumps(payload,ensure_ascii=False,default=str)
            if current!=last: yield f"data: {current}\n\n"; last=current
            if payload.get("status") in {"success","failed","not_found"}: break
            await asyncio.sleep(1)
    return StreamingResponse(events(),media_type="text/event-stream")
