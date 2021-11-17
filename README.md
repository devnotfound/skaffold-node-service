## Introduction:
This is a reference implementation for building a Node.js microservice using <a name="http://skaffold.dev/">Skaffold</a>

## Who is this for:
For developers looking to use Skaffold to build AWS and Node.js based microservices, locally.
This repo can also act as a customizable template to building your own microservices. 

## App Features:

- Uses <a name="http://fastify.io">fastify</a> as the web framework
- Uses a declarative approach to adding new 'routes' (aka api operations) to your code (using 'fastify-openapi-glue')
- 'Decorates' your route with a generic exception handler, avoiding the need to litter common try catch blocks throughout your code. 
- Comes with an extensible eslint configuration
- Exposes an OpenAPI / Swagger UI on https://localhost:8443/documentation

## Infra Features:

- Uses skaffold version 1.32
- Hot reloads your application code by synchronizing src files (see skaffold.yaml for more details). It runs nodemon to constantly keep an eye on your application changes (under src/*) and automatically restarts the app.
- Depends on minikube
- Port forwarding configured to listen on port 8443 (https)
- Exposes a node ws debugging port on 9229, so you can attach your VS Code or any other debugger (eg. chrome://inspect) to step through your application code
- Runs <a name="https://localstack.cloud">Localstack</a> for your AWS needs
- Uses <a name="https://github.com/krallin/tini">tini</a> for proper termination of your process, apart from other benefits


## To start developing:
- First start minikube
    - make start-mk
- Then build the service
    - make build-ms
- Finally, start service
    - make start
- To see the minikube dashboard
    - make dashboard-mk