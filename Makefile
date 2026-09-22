.PHONY: deploy deploy-log build publish

deploy:
	@nohup ./scripts/deploy.sh >/dev/null 2>&1 & disown
	@echo "Deploy started in background — tail progress with: make deploy-log"

deploy-log:
	@tail -f log/deploy/latest.log

build:
	npm version patch --no-git-tag-version
	npm run build

publish:
	npm publish
