
all:
	docker-compose up -d

down:
	docker-compose down

clean: 
	docker system prune -f --volumes

build:
	docker-compose build
