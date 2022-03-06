all: build

build:
	docker-compose -f docker-compose.yml build

run: build
	docker-compose -f docker-compose.yml up
