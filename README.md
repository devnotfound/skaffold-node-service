## 
## Introduction:
This is a reference implementation for building a Node.js microservice using <a href="http://skaffold.dev/">Skaffold</a>

## Who is this for:
For developers looking to use Skaffold to build AWS and Node.js based microservices, locally.
This repo can also act as a customizable template to building your own microservices.
This implementation of Skaffold uses minikube, a single node'd Kubernetes cluster, ideal for local development work.

## App Features:

- Uses <a name="http://fastify.io">fastify</a> as the web framework
- Uses a declarative approach to adding new 'routes' (aka api operations) to your code (using 'fastify-openapi-glue')
- 'Decorates' your route with a generic exception handler, avoiding the need to litter common try catch blocks throughout your code. 
- Comes with an extensible eslint configuration
- Exposes an OpenAPI / Swagger UI on https://localhost:8443/documentation
- Uses <a href="https://jestjs.io">Jest as the unit test framework</a> / harness
- Code is formatted and styled using Eslint and Prettier

## Infra Features:

- Uses skaffold version 1.32
- Runs on minikube version 1.22. (It should also work on a minishift cluster but I havent tried, PR's are welcome)
- Hot reloads your application code by synchronizing src files (see skaffold.yaml for more details). It runs nodemon to constantly monitor your application for changes (under src/*) and automatically restarts the app.
- Port forwarding configured to listen on port 8443 (https)
- Exposes a node ws debugging port on 9229, so you can attach your VS Code or any other debugger (eg. chrome://inspect) to step through your application code
- Runs <a href="https://localstack.cloud">Localstack</a> for your AWS needs (S3, DynamoDB, IAM etc)
- Uses <a href="https://github.com/krallin/tini">tini</a> for proper termination of your process


## To start developing:
- First start minikube
    - make start-mk
- Then build the service
    - make build-ms
- Finally, start service
    - make start
- To see the minikube dashboard
    - make dashboard-mk

## Project Anatomy
- app folder contains source code under src
- The OpenAPI spec is loaded from ~/app/src/spec/swagger.yaml
- All http route handlers are located under ~/app/src/routes folder
- All services modules (business logic) are located under ~/app/src/services folder
- All dals are located under ~/app/src/dal folder
- Application dependency injection is handled via the app.js
- Tests are writted using *.spec.js convention
- The code linting and formatting spec is under ~/app/default-lint.js
- The certs used for loading the http server are listed under ~/app/certs
- There is a Makefile under the root folder with helpful targets
- All infra components (kubernetes deployment and service configs) are located inside the ~/app/infra folder