const app = require('./app');
const { readFileSync } = require('fs');
const { join } = require('path');
const fastify = require('fastify')({
  logger: true,
  https: {
    key: readFileSync(join(__dirname, '..', '..', 'certs', 'server.key')),
    cert: readFileSync(join(__dirname, '..', '..', 'certs', 'server.cert')),
  },
});

const runServer = async () => {
  try {
    const port = process.env.HTTP_PORT || 8443;
    const host = process.env.HTTP_HOST || '0.0.0.0';
    await app(fastify);
    await fastify.listen(port, host);
  } catch (err) {
    fastify.log.error(`error occurred while trying to start app ${err.message}`);
    throw err;
  }
};

process.on('unhandledRejection', () => {
  fastify.log.error(`unhandledRejection encountered`);
});
module.exports = runServer;
