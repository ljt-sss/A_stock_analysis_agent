from fastapi import APIRouter
from app.api.v1 import agent_tasks,analysis,stocks

api_router=APIRouter()
for router in [stocks.router,analysis.router,agent_tasks.router]: api_router.include_router(router)
