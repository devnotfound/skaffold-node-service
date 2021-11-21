const { jest: _jest, it, expect, describe, beforeAll } = require('@jest/globals');

const mockedAppFunction = _jest.fn(() => {});
const mockedErrorLogger = _jest.fn(() => {});
const mockedFastifyListener = _jest.fn(() => {});
const mockedFastifyErrorHandler = _jest.fn((_anErrorHandler) => {});
const fastifyConstructor = _jest.fn(function () {
  return {
    listen: mockedFastifyListener,
    log: {
      error: mockedErrorLogger,
    },
    setErrorHandler: mockedFastifyErrorHandler,
  };
});
const appModule = function () {
  return mockedAppFunction;
};
let fastifyModule = () => {
  return fastifyConstructor;
};
beforeAll(() => {
  _jest.mock('./app', appModule);
  _jest.mock('fastify', fastifyModule);
});

describe('test run', () => {
  let runServer;
  const error = new Error('these pretzels are making me thirsty');
  const expectedErrorMessage = `error occurred while trying to start app ${error.message}`;
  beforeAll(() => {
    runServer = require('./run');
  });
  it('should pass', () => {
    expect(runServer()).resolves.toBeUndefined();
  });
  it('shold call the fastify listen function', () => {
    expect(mockedFastifyListener).toBeCalledWith(8443, '0.0.0.0');
  });
  it('should call the app function', () => {
    expect(mockedAppFunction).toBeCalledTimes(1);
  });
  it('should call the fastify constructor', () => {
    expect(fastifyConstructor).toBeCalledTimes(1);
  });
  it('should not call the error logger', () => {
    expect(mockedErrorLogger).toBeCalledTimes(0);
  });
  describe('test run exception handling', () => {
    beforeAll(() => {
      runServer = require('./run');
    });
    it('should throw an error when fastify set error handler fails', () => {
      mockedFastifyErrorHandler.mockRejectedValue(error);
      expect(runServer()).rejects.toThrow(error);
      mockedFastifyErrorHandler.mockReset();
    });
    it('should log error', () => {
      expect(mockedErrorLogger).toBeCalledWith(expectedErrorMessage);
    });
  });
});
