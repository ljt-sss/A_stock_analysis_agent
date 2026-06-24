from fastapi import APIRouter
from app.api.v1 import agent_tasks,analysis,evals,mcp,memory,stocks,wiki

api_router=APIRouter()
for router in [stocks.router,analysis.router,agent_tasks.router,wiki.router,memory.router,evals.router,mcp.router]:
    api_router.include_router(router)
