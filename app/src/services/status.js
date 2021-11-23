const statusService = (logger) => {
  const getStatus = () => {
    logger.debug('Returning status ok');
    return { status: 'OK' };
  };

  return {
    getStatus,
  };
};

module.exports = statusService;
