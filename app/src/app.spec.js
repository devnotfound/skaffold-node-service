const { jest: _jest, describe, it, beforeAll, expect } = require('@jest/globals');

const mockedGetStatus = _jest.fn(() => {});
const statusServiceModule = _jest.fn(() => {
  return {
    getStatus: mockedGetStatus,
  };
});
const mockedOpenApiGlue = _jest.fn(() => {});
const mockedOpenApiUI = _jest.fn(() => {});
const mockedServerRegister = _jest.fn(() => {});
const mockedServerLogger = _jest.fn(() => {});
const mockedServer = {
  register: mockedServerRegister,
  log: mockedServerLogger,
};
beforeAll(() => {
  _jest.mock('./services/status', () => {
    return statusServiceModule;
  });
  _jest.mock('fastify-openapi-glue', mockedOpenApiGlue);
  _jest.mock('fastify-swagger', mockedOpenApiUI);
});

describe('app', () => {
  let app;
  beforeAll(() => {
    app = require('./app');
    app(mockedServer);
  });
  it('should call server register', () => {
    expect(mockedServerRegister).toBeCalledTimes(2);
  });
  it('should call the status service constructor', () => {
    expect(statusServiceModule).toBeCalledWith(mockedServerLogger);
  });
});
