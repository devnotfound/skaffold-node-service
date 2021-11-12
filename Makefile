.DEFAULT_GOAL := help

help:           		## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

# Docker only targets (wont run under minikube)
docker-build: 			## build the microservice docker image
		docker build -f Dockerfile -t skaffold-node-service:latest .
docker-run: 			## run the microservice container in isolation
		docker rm skaffold-node-service-latest; \
		docker run --init -m "256M" --memory-swap "256M" -p 8443:8443 --name skaffold-node-service-latest skaffold-node-service:latest
docker-stop: 			## stop the microservice container
		docker stop skaffold-node-service-latest; \
		docker rm skaffold-node-service-latest
docker-system-prune: 
		docker system prune -a

# MS targets
build-ms: 			## build the microservice
		@eval $$(minikube docker-env); \
		docker build --build-arg NODE_ENV=development -f Dockerfile -t skaffold-node-service:latest .
start-ms: 			## start the microservice in a k8s cluster
		kubectl apply -f infra/local/deployment/microservice-dev.yaml; \
		kubectl apply -f infra/local/service/microservice-dev.yaml;
stop-ms: 			## stop the microservice running in a k8s cluster
		-kubectl delete deployment skaffold-node-service; \
		kubectl delete service skaffold-node-service;
start-ms-svc: 			## expose the microservice service port
		minikube service --https --url skaffold-node-service
skaffold-ms: 			## run the microservice for local development (watch mode)
		skaffold dev --port-forward
pf-ms: 				## enable port forwarding on the microservice
		kubectl port-forward service/skaffold-node-service 8443:8443;

# All targets
# start-all: start-ms start-ls start-cognito start-ms-svc
# start-all: 
# 		skaffold debug --port-forward
start: #start-ls start-cognito
		#@sleep 20; 
		skaffold dev --port-forward;

debug: #start-ls start-cognito
		# @sleep 20; 
		skaffold debug --port-forward;

stop: stop-ms stop-cognito stop-ls
clean-start: stop-all start-all
clean-build-start: stop-all build-ms start-all

# Minikube targets
start-mk: 
		minikube start; \
		minikube mount ./infra/local/volume/:/init-scripts/;
stop-mk: 
		minikube stop
dashboard-mk:
		minikube dash

# mics targets		
delete-image:
		@eval $$(minikube docker-env) ;\
		docker rmi $(docker images skaffold-node-service -a -q)
tail-logs:
		kubectl logs -f skaffold-node-service
install-skaffold:
		curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-darwin-amd64 && \
		sudo install skaffold /usr/local/bin/
delete-ms-images:
		docker images --filter='reference=skaffold-node-service' --format='{{.Repository}}:{{.Tag}}' | xargs docker rmi -f
delete-ls-images:
		docker images --filter='reference=localstack/localstack' --format='{{.Repository}}:{{.Tag}}' | xargs docker rmi -f

# dynamodb browser
browser-dynamo:
		export DYNAMO_ENDPOINT=http://localhost:4566; \
		dynamodb-admin

