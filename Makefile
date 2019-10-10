GIT_REVISION := $(shell git rev-parse --short=6 --verify HEAD)

APP_RELEASE := $(GIT_REVISION)
PACKAGES_RELEASE := $(GIT_REVISION)
PHP_FPM_RELEASE := $(GIT_REVISION)

REPO_VENDOR := nofunds
APPLICATION := cellc-dashboard
REPO_URL := 376181236267.dkr.ecr.eu-west-1.amazonaws.com

KNOWN_HOSTS_FILE := /keybase/team/hyve_devops/known_hosts/bitbucket.org

ECR_LOGIN := $(shell aws ecr get-login --no-include-email --region eu-west-1)
KNOWN_HOSTS := $(shell cat ${KNOWN_HOSTS_FILE})

REPO_TASKS := repo-login tag-latest tag-version publish-latest publish-version

.PHONY: help app-img build-app publish tag publish-latest publish-version tag-latest tag-version repo-login

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

app-img: ## Build, tag and publish (AWS ECR) the application container image
app-img: IMAGE_NAME = $(REPO_VENDOR)/$(APPLICATION)
app-img: RELEASE = $(APP_RELEASE)
app-img: build-app $(REPO_TASKS)

build-app: Dockerfile
	docker build -t $(IMAGE_NAME) --build-arg node_env=$(NODE_ENV) --build-arg api_host=$(API_HOST) --no-cache -f Dockerfile .

publish: repo-login publish-latest publish-version

tag: tag-latest tag-version

publish-latest: tag-latest
	docker push $(REPO_URL)/$(IMAGE_NAME):latest

publish-version: tag-version
	docker push $(REPO_URL)/$(IMAGE_NAME):$(RELEASE)

tag-latest:
	docker tag $(IMAGE_NAME):latest $(REPO_URL)/$(IMAGE_NAME):latest

tag-version:
	docker tag $(IMAGE_NAME):latest $(REPO_URL)/$(IMAGE_NAME):$(RELEASE)

repo-login:
	$(ECR_LOGIN)