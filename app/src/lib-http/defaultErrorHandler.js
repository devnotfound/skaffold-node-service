const defaultErrorHandler = function (error, request, reply) {
  // Log error
  this.log.error(`Error caught by default handler. Error Message [${error}]`);
  // Send error response
  return reply.status(500).send(internalServerError);
};

const internalServerError = {
  error: 'Internal server error',
  message: 'Internal server error occurred try again',
};

module.exports = defaultErrorHandler;
