from fastapi import APIRouter
from app.mcp_clients import MCP_CLIENTS
from app.schemas.agent import ToolRunRequest
from app.skills.executor import skill_executor
from app.skills.registry import SKILLS,list_skills

router=APIRouter(tags=["skills-mcp"])
@router.get("/skills")
def skills(): return list_skills()
@router.get("/skills/{skill_name}")
def skill_detail(skill_name:str): return {"name":skill_name,**SKILLS.get(skill_name,{"title":"Unknown","description":""})}
@router.post("/skills/{skill_name}/run")
async def run_skill(skill_name:str,body:ToolRunRequest): return (await skill_executor.run(skill_name,body.input)).model_dump()
@router.get("/mcp/tools")
def mcp_tools(): return [client.describe() for client in MCP_CLIENTS.values()]
@router.post("/mcp/tools/{tool_name}/call")
async def call_tool(tool_name:str,body:ToolRunRequest):
    service,method=tool_name.split(".",1) if "." in tool_name else (tool_name,"")
    client=MCP_CLIENTS.get(service)
    if not client: return {"status":"failed","error":"Unknown MCP service"}
    return {"status":"success","output":await client.invoke(method,body.input)}

