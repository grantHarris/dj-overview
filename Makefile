VERSION := $(shell cat VERSION)
IMAGE_NAME := ghcr.io/grantharris/dj-overview

all: build

build:
	docker build -t $(IMAGE_NAME):$(VERSION) .

push: build
	docker push $(IMAGE_NAME):$(VERSION)

pull:
	docker pull $(IMAGE_NAME):$(VERSION)
