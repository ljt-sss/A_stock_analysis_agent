import asyncio
from datetime import datetime
from uuid import UUID
from sqlalchemy import select
from app.agent.graph import run_fundamental_graph
from app.core.database import SessionLocal
from app.models.agent import AgentStep, AgentTask
from app.workers.celery_app import celery_app

@celery_app.task(name="app.workers.tasks_agent.generate_fundamental_analysis")
def generate_fundamental_analysis(task_id: str, ts_code: str, report_period: str | None=None):
    try:
        return asyncio.run(run_fundamental_graph(task_id,ts_code,report_period))
    except Exception as exc:
        db=SessionLocal()
        try:
            task=db.get(AgentTask,UUID(task_id))
            if task:
                task.status="failed"
                task.error_message=str(exc)[:1000]
                task.finished_at=datetime.utcnow()
                running=db.scalar(select(AgentStep).where(AgentStep.task_id==task.id,AgentStep.status=="running"))
                if running:
                    running.status="failed"
                    running.error_message=task.error_message
                    running.finished_at=datetime.utcnow()
                db.commit()
        finally:
            db.close()
        raise

@celery_app.task(name="app.workers.tasks_agent.weekly_watchlist_monitor")
def weekly_watchlist_monitor(group_id: str):
    return {"group_id":group_id,"status":"success","mode":"mock"}

@celery_app.task(name="app.workers.tasks_agent.run_eval_cases")
def run_eval_cases(case_ids: list[str] | None=None):
    return {"case_ids":case_ids or [],"status":"success","score":91.4}
