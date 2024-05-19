DOCKER_LOCAL_NAME := discord_good_morning_project
DOCKER_LOCAL_CONTAINER_NAME := discord_good_morning_project_app

DOCKER_PROD_NAME := discord_good_morning_project_prod


up:
		docker-compose --project-name $(DOCKER_LOCAL_NAME) -f .docker/docker-compose-dev.yml up
_build:
		docker-compose --project-name $(DOCKER_LOCAL_NAME) -f .docker/docker-compose-dev.yml build --no-cache
down:
		docker-compose --project-name $(DOCKER_LOCAL_NAME) -f .docker/docker-compose-dev.yml down
connect:
		docker exec -it $(DOCKER_LOCAL_NAME) bash

up-prod:
		docker-compose --project-name $(DOCKER_PROD_NAME) -f .docker/docker-compose-prod.yml up -d
build-prod:
		docker-compose --project-name $(DOCKER_PROD_NAME) -f .docker/docker-compose-prod.yml build --no-cache
down-prod:
		docker-compose --project-name $(DOCKER_PROD_NAME) -f .docker/docker-compose-prod.yml down