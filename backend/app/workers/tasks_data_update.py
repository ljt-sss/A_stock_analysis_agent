from app.workers.celery_app import celery_app

@celery_app.task
def update_stock_market_data(ts_code: str):
    return {"ts_code":ts_code,"status":"updated","provider":"mock"}

@celery_app.task
def update_watchlist_market_data(group_id: str):
    return {"group_id":group_id,"status":"updated","provider":"mock"}
