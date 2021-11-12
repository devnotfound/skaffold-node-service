const statusRoute = (logger, service) => {
  const getStatus = async (request, reply) => {
    const result = await service.getStatus();
    return reply.send(result);
  };
  return {
    getStatus,
  };
};

module.exports = statusRoute;
