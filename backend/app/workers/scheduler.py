from apscheduler.schedulers.blocking import BlockingScheduler
from app.workers.tasks_agent import weekly_watchlist_monitor
from app.workers.tasks_data_update import update_watchlist_market_data

def main():
    scheduler=BlockingScheduler(timezone="Asia/Shanghai")
    scheduler.add_job(lambda:update_watchlist_market_data.delay("default"),"cron",day_of_week="mon",hour=8,id="weekly_market_update")
    scheduler.add_job(lambda:weekly_watchlist_monitor.delay("default"),"cron",day_of_week="sun",hour=20,id="weekly_monitor")
    scheduler.start()

if __name__=="__main__":
    main()
