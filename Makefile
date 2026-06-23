.PHONY: up down build logs migrate seed test

up:
	docker compose up -d --build
down:
	docker compose down
build:
	docker compose build
logs:
	docker compose logs -f backend worker frontend
migrate:
	docker compose exec backend alembic upgrade head
seed:
	docker compose exec backend python -m app.seed.seed_demo_data
test:
	docker compose exec backend pytest

