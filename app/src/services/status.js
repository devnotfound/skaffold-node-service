const statusService = (_logger) => {
  const getStatus = () => {
    return { status: 'OK' };
  };

  return {
    getStatus,
  };
};

module.exports = statusService;
