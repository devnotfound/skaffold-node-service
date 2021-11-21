const { jest: _jest, describe, it, expect, beforeAll } = require('@jest/globals');
let run;
let mockedProcessExit, mockedConsoleError;

// default mock'd behaviour
beforeAll(() => {
  _jest.mock('./run');
  run = require('./run');
  run.mockRejectedValue('foo');

  mockedProcessExit = _jest.fn(() => 'mocked exit');
  mockedConsoleError = _jest.fn(() => 'mocked console error');
  _jest.mock('process', () => {
    const originalModule = _jest.requireActual('process');
    return {
      __esModule: true,
      ...originalModule,
      exit: mockedProcessExit,
    };
  });
  _jest.mock('console', () => {
    return {
      error: mockedConsoleError,
    };
  });
});

describe('index.js test', () => {
  describe('success', () => {
    it('should pass', () => {
      require('./index');
      expect(run).toBeCalledWith();
    });
  });
  describe('failure', () => {
    beforeAll(() => {
      require('./index');
    });
    it('should exit process with a non zero value', () => {
      expect(mockedProcessExit).toBeCalledWith(1);
    });
    it('should call console error once', () => {
      expect(mockedConsoleError).toBeCalledTimes(1);
    });
  });
});
