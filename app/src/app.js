const statusRoute = require('./routes/status');
const statusService = require('./services/status');
const openapiGlue = require('fastify-openapi-glue');
const { join } = require('path');
const wrapRoute = require('./lib-http/wrapRoute');

const app = async (server) => {
  const routeList = [statusRoute(server.log, statusService(server.log))];
  const options = {
    specification: `${join(__dirname, 'spec', 'swagger.yaml')}`,
    service: wrapRoute(routeList, server.log),
    noAdditional: true,
    ajvOptions: {
      formats: {
        'custom-format': /\d{2}-\d{4}/,
      },
    },
  };
  server.register(openapiGlue, options);
};

module.exports = app;
