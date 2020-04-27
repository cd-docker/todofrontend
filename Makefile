-include .env

.PHONY: build integration acceptance results login logout publish clean

DOCKER_BUILDKIT ?= 1
COMPOSE_DOCKER_CLI_BUILD ?= 1
export

all: clean build integration acceptance results

build:
	${INFO} "Building latest images..."
	docker-compose build --pull base
	docker-compose build
	${INFO} "Build stage complete"

integration:
	${INFO} "Running integration tests..."
	docker-compose up integration
	${INFO} "Integration stage complete"

acceptance:
	${INFO} "Running acceptance tests..."
	docker-compose up acceptance
	${INFO} "Acceptance stage complete"

results:
	${INFO} "Collecting test reports..."
	docker-compose up --abort-on-container-exit reports
	reports=$$(docker-compose ps -q reports)
	docker cp $$reports:/app/reports reports
	${INFO} "Checking test results..."
	integration=$$(docker-compose ps -q integration)
	integration=$$(docker inspect -f "{{ .State.ExitCode }}" $$integration)
	acceptance=$$(docker-compose ps -q acceptance)
	acceptance=$$(docker inspect -f "{{ .State.ExitCode }}" $$acceptance)
	if [[ $$integration -ne 0 || $$acceptance -ne 0 ]]
		then ${ERROR} "Test failure"
	fi
	${INFO} "Results stage complete"

login:
	${INFO} "Logging into Docker Hub..."
	cat $$DOCKER_PASSWORD | docker login --username $$DOCKER_USER --password-stdin
	${INFO} "Login stage complete"

publish:
	${INFO} "Publishing images..."
	docker-compose push
	${INFO} "Publish stage complete"

logout:
	${INFO} "Logging out..."
	docker logout
	${INFO} "Logout stage complete"

clean:
	${INFO} "Cleaning environment..."
	docker-compose down -v --remove-orphans
	docker images -q -f dangling=true -f label=application=todofrontend | xargs -I ARGS docker rmi -f --no-prune ARGS
	rm -rf build reports cypress/results
	${INFO} "Clean stage complete"

# Recommended settings
.ONESHELL:
.SILENT:
SHELL=/bin/bash
.SHELLFLAGS = -ceo pipefail

# Cosmetics
YELLOW := "\e[1;33m"
RED := "\e[1;31m"
NC := "\e[0m"
INFO := bash -c 'printf $(YELLOW); echo "=> $$0"; printf $(NC)'
ERROR := bash -c 'printf $(RED); echo "ERROR: $$0"; printf $(NC); exit 1'