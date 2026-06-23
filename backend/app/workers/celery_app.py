from celery import Celery
from app.core.config import settings

celery_app=Celery("ashare_agent",broker=settings.celery_broker_url,backend=settings.celery_result_backend,include=["app.workers.tasks_data_update","app.workers.tasks_reports","app.workers.tasks_agent"])
celery_app.conf.task_routes={
    "app.workers.tasks_data_update.*":{"queue":"data_update_queue"},
    "app.workers.tasks_reports.*":{"queue":"report_queue"},
    "app.workers.tasks_agent.*":{"queue":"agent_queue"},
}
