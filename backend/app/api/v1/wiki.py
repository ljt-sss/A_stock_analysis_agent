from uuid import UUID
from fastapi import APIRouter,Depends,HTTPException,Query
from fastapi.encoders import jsonable_encoder
from sqlalchemy import or_,select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.wiki import WikiPage
from app.schemas.wiki import WikiUpdate

router=APIRouter(prefix="/wiki",tags=["wiki"])
def item(x): return {"id":str(x.id),"page_type":x.page_type,"title":x.title,"slug":x.slug,"ts_code":x.ts_code,"content_md":x.content_md,"version":x.version,"freshness":x.freshness,"updated_by":x.updated_by,"updated_at":x.updated_at}
@router.get("/pages")
def pages(db:Session=Depends(get_db)): return jsonable_encoder([item(x) for x in db.scalars(select(WikiPage).order_by(WikiPage.title)).all()])
@router.get("/pages/{slug}")
def page(slug:str,db:Session=Depends(get_db)):
    x=db.scalar(select(WikiPage).where(WikiPage.slug==slug))
    if not x: raise HTTPException(404,"Wiki page not found")
    return jsonable_encoder(item(x))
@router.post("/pages/{slug}/update")
def update(slug:str,body:WikiUpdate,db:Session=Depends(get_db)):
    x=db.scalar(select(WikiPage).where(WikiPage.slug==slug))
    if not x: raise HTTPException(404,"Wiki page not found")
    x.content_md=body.content_md; x.version+=1; x.updated_by="researcher"; db.commit(); return {"status":"success","version":x.version}
@router.get("/search")
def search(q:str=Query(""),db:Session=Depends(get_db)): return jsonable_encoder([item(x) for x in db.scalars(select(WikiPage).where(or_(WikiPage.title.ilike(f"%{q}%"),WikiPage.content_md.ilike(f"%{q}%")))).all()])

