import json
import time
import urllib.request

BASE = "http://localhost:8000/api/v1"

request = urllib.request.Request(
    f"{BASE}/agent/tasks/fundamental-analysis",
    data=json.dumps({"ts_code": "600519.SH"}).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)
task = json.load(urllib.request.urlopen(request))
print("created", task["id"], task["status"])

for _ in range(40):
    task = json.load(urllib.request.urlopen(f"{BASE}/agent/tasks/{task['id']}"))
    if task["status"] in {"success", "failed"}:
        break
    time.sleep(1)

steps = json.load(urllib.request.urlopen(f"{BASE}/agent/tasks/{task['id']}/steps"))
calls = json.load(urllib.request.urlopen(f"{BASE}/agent/tasks/{task['id']}/tool-calls"))
print(
    "finished",
    task["status"],
    task["progress"],
    "steps",
    len(steps),
    "calls",
    len(calls),
    "report",
    bool(task.get("result", {}).get("report_id")),
)

assert task["status"] == "success"
assert len(steps) == 8
assert len(calls) >= 9
assert task["result"]["report_id"]
