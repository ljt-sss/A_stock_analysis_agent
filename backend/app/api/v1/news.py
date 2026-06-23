from fastapi import APIRouter,Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.report import CompanyNews,SectorHotEvent
from app.services.stocks.mock_data import STOCKS

router=APIRouter(prefix="/news",tags=["news-sector"])
@router.get("/overview")
def overview(db:Session=Depends(get_db)):
    events=db.scalars(select(SectorHotEvent).order_by(SectorHotEvent.heat_score.desc())).all(); news=db.scalars(select(CompanyNews).order_by(CompanyNews.publish_time.desc())).all()
    return jsonable_encoder({"kpis":{"hot_sectors":len(events),"sector_movements":18,"company_news":len(news)+86,"risk_announcements":6,"institutional_research":24},"sectors":[{"id":str(x.id),"name":x.sector_name,"heat_score":float(x.heat_score),"change_pct":float(x.change_pct),"turnover":float(x.turnover),"reasons":x.reasons,"related_stocks":x.related_stocks} for x in events],"news":[{"id":str(x.id),"title":x.title,"content":x.content,"source":x.source,"publish_time":x.publish_time,"sentiment":x.sentiment,"event_type":x.event_type} for x in news],"heat_trend":[{"time":f"{9+i//2:02d}:{'30' if i%2 else '00'}","value":52+i*3+(i%3)*4} for i in range(12)],"related_stocks":STOCKS[:5],"reasoning":{"summary":"政策催化、产业订单与资金关注共同推动热点扩散。","indicators":["板块成交额能否持续","龙头公司订单验证","政策落地节奏"]}})

