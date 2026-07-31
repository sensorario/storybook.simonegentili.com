.PHONY: deploy deploy-log publish

deploy:
	@nohup ./scripts/deploy.sh >/dev/null 2>&1 & disown
	@echo "Deploy started in background — tail progress with: make deploy-log"

deploy-log:
	@tail -f log/deploy/latest.log

publish:
	npm run build
	npm publish
