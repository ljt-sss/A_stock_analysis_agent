from app.workers.celery_app import celery_app

@celery_app.task
def update_latest_reports(ts_code: str):
    return {"ts_code":ts_code,"reports":1,"status":"updated"}

@celery_app.task
def parse_report(report_id: str):
    return {"report_id":report_id,"parse_status":"success","completeness":96.8}
