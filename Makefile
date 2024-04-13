.PHONY: all backend frontend

all: backend frontend

backend:
	@echo "Starting the backend server..."
	@cd backend && npm run start &

frontend:
	@echo "Starting the frontend server..."
	@cd frontend && npm run dev &

stop:
	@-pkill -P $$!
	@echo "Servers stopped."
