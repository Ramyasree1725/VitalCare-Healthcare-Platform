.PHONY: all build start dev test test-coverage clean docker-build docker-run

all: build test

build:
	@echo "Building VitalCare Healthcare Platform..."
	npm run build

start:
	@echo "Starting VitalCare Server on Port 9090..."
	npm start

dev:
	npm run dev

test:
	npm test

test-coverage:
	npm run test:coverage

docker-build:
	docker build -t vitalcare-healthcare .

docker-run:
	docker run -p 9090:9090 vitalcare-healthcare

clean:
	@echo "Clean completed."
