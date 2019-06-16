HASH := `git rev-parse --short HEAD`

SERVICE := svelte-realworld
PROJECT := svelte-dev

IMAGE := gcr.io/$(PROJECT)/$(SERVICE):$(HASH)

sapper:
	@echo "\n~> building Sapper app"
	@npm run build


docker:
	@echo "\n~> building docker image"
	@gcloud builds submit -t $(IMAGE)


deploy: sapper docker
	@echo "\n~> deploying $(SERVICE) to Cloud Run servers"
	@gcloud beta run deploy $(SERVICE) --allow-unauthenticated --region us-central1 --image $(IMAGE) --memory=512Mi
