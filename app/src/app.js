const statusRoute = require('./routes/status');
const statusService = require('./services/status');
const openapiGlue = require('fastify-openapi-glue');
const { join } = require('path');
const createRouteList = require('./lib-http/wrapRoute');
const openapiUI = require('fastify-swagger');

const app = async (server) => {
  const routeList = [statusRoute(server.log, statusService(server.log))];
  const specPath = join(__dirname, 'spec', 'swagger.yaml');
  const openapiGlueOptions = {
    specification: specPath,
    service: createRouteList(routeList, server.log),
    noAdditional: true,
    ajvOptions: {
      formats: {
        'custom-format': /\d{2}-\d{4}/,
      },
    },
  };
  const openapiUIOptions = {
    mode: 'static',
    specification: {
      path: specPath,
    },
    exposeRoute: true,
  };
  await server.register(openapiGlue, openapiGlueOptions);
  await server.register(openapiUI, openapiUIOptions);
};

module.exports = app;
