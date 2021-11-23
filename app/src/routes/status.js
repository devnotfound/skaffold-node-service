const statusRoute = (logger, service) => {
  const getStatus = (request, reply) => {
    const result = service.getStatus();
    return reply.send(result);
  };
  return {
    getStatus,
  };
};

module.exports = statusRoute;
