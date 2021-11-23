const { jest: _jest, beforeAll, it, expect } = require('@jest/globals');

const mockedDebugLogger = _jest.fn(() => {});
const mockedLogger = { debug: mockedDebugLogger };
let statusService, getStatus;
beforeAll(() => {
  statusService = require('./status')(mockedLogger);
  getStatus = statusService.getStatus;
});

describe('statusService constructor', () => {
  it('should return an object with getStatus function', () => {
    expect(typeof getStatus).toBe('function');
  });
});

describe('statusService getStatus', () => {
  let getStatusResponse;
  beforeAll(() => {
    getStatusResponse = getStatus();
  });
  it('should return a status object', () => {
    expect(getStatusResponse).toStrictEqual({ status: 'OK' });
  });
  it('should call the debug logger once', () => {
    expect(mockedDebugLogger).toBeCalledTimes(1);
  });
});
