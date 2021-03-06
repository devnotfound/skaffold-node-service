const createRouteList = (routeObjectList, _logger) => {
  const wrappedObject = {};
  if (!Array.isArray(routeObjectList)) {
    throw new Error(
      `Invalid routeObjectList type. Expected Array, received ${typeof routeObjectList}`
    );
  }
  Object.entries(routeObjectList).forEach(([_key, routeObject]) => {
    Object.entries(routeObject).forEach(([key, value]) => {
      if (typeof value !== 'function') {
        throw new Error(
          `Invalid entry encountered while trying wrap route. Expected type function received ${typeof value}`
        );
      }
      wrappedObject[key] = value;
    });
  });
  return wrappedObject;
};

const _wrappedFunction = (routeFn, logger) =>
  async function (request, reply) {
    try {
      const result = await routeFn(request, reply);
      if (result) {
        return reply.send(result);
      }
      return Promise.resolve();
    } catch (err) {
      logger.error(`error occurred by wrapRoute ${err.message}`);
      reply.statusCode = 500;
      return reply.send(internalServerError);
    }
  };

const internalServerError = {
  error: 'Internal server error',
  message: 'Internal server error occurred try again',
};

module.exports = createRouteList;
