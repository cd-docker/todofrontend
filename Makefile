-include .env

.PHONY: build integration acceptance clean

DOCKER_BUILDKIT ?= 1
COMPOSE_DOCKER_CLI_BUILD ?= 1
export

all: clean build integration acceptance

build:
	${INFO} "Building latest images..."
	docker-compose build --pull base
	docker-compose build
	${INFO} "Build stage complete"

integration:
	${INFO} "Running integration tests..."
	docker-compose up --abort-on-container-exit integration
	${INFO} "Integration stage complete"

acceptance:
	${INFO} "Running acceptance tests..."
	docker-compose up --abort-on-container-exit acceptance
	${INFO} "Acceptance stage complete"

clean:
	${INFO} "Cleaning environment..."
	docker-compose down -v --remove-orphans
	docker images -q -f dangling=true -f label=application=todofrontend | xargs -I ARGS docker rmi -f --no-prune ARGS
	rm -rf build
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