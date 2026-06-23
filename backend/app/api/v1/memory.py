from uuid import UUID
from fastapi import APIRouter,Depends,HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.memory import AgentMemory
from app.schemas.wiki import MemoryCreate

router=APIRouter(prefix="/memory",tags=["memory"])
def item(x): return {"id":str(x.id),"scope":x.scope,"memory_type":x.memory_type,"ts_code":x.ts_code,"title":x.title,"content":x.content,"source":x.source,"confidence":float(x.confidence),"status":x.status,"created_at":x.created_at,"updated_at":x.updated_at}
@router.get("")
def list_memory(scope:str|None=None,ts_code:str|None=None,db:Session=Depends(get_db)):
    query=select(AgentMemory)
    if scope: query=query.where(AgentMemory.scope==scope)
    if ts_code: query=query.where(AgentMemory.ts_code==ts_code)
    return jsonable_encoder([item(x) for x in db.scalars(query.order_by(AgentMemory.updated_at.desc())).all()])
@router.post("")
def create(body:MemoryCreate,db:Session=Depends(get_db)):
    x=AgentMemory(**body.model_dump(),source="researcher"); db.add(x); db.commit(); db.refresh(x); return jsonable_encoder(item(x))
@router.put("/{memory_id}")
def update(memory_id:UUID,body:MemoryCreate,db:Session=Depends(get_db)):
    x=db.get(AgentMemory,memory_id)
    if not x: raise HTTPException(404,"Memory not found")
    for k,v in body.model_dump().items(): setattr(x,k,v)
    db.commit(); return {"status":"success"}
@router.delete("/{memory_id}")
def delete(memory_id:UUID,db:Session=Depends(get_db)):
    x=db.get(AgentMemory,memory_id)
    if x: db.delete(x); db.commit()
    return {"status":"deleted"}
