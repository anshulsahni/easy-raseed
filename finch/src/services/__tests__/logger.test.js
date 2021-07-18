import config from '../../../config/index.js';
import { logInfo, logError, logWarning, formatLog } from '../logger';

/* eslint-disable no-console */
describe('Services/logger', () => {
  describe('#logInfo', () => {
    beforeEach(() => {
      /* eslint-disable-next-line no-console */
      console.log = jest.fn();
    });

    test('should call console.log with correct arguments when prettify true', () => {
      config.logs.prettify = true;
      logInfo('testing msg for log info', {
        someKey: 'someValue',
      });
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith({
        msg: 'testing msg for log info',
        type: 'info',
        context: {
          someKey: 'someValue',
        },
      });
    });

    test('should call console.log with stringified params when prettify false', () => {
      config.logs.prettify = false;
      logInfo('testing msg for log info', {
        someKey: 'someValue',
      });
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(
        JSON.stringify({
          type: 'info',
          msg: 'testing msg for log info',
          context: {
            someKey: 'someValue',
          },
        }),
      );
    });
  });

  describe('#logError', () => {
    beforeEach(() => {
      /* eslint-disable-next-line no-console */
      console.error = jest.fn();
    });

    test('should call console.error with correct arguments when prettify true', () => {
      config.logs.prettify = true;
      logError('testing msg for error', {
        someKey: 'someValue',
      });
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith({
        msg: 'testing msg for error',
        type: 'error',
        context: {
          someKey: 'someValue',
        },
      });
    });

    test('should call console.error with stringified params when prettify false', () => {
      config.logs.prettify = false;
      logError('testing msg for error', {
        someKey: 'someValue',
      });
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        JSON.stringify({
          type: 'error',
          msg: 'testing msg for error',
          context: {
            someKey: 'someValue',
          },
        }),
      );
    });
  });

  describe('#logWarn', () => {
    beforeEach(() => {
      /* eslint-disable-next-line no-console */
      console.warn = jest.fn();
    });

    test('should call console.warn with correct arguments when prettify true', () => {
      config.logs.prettify = true;
      logWarning('testing msg for warning', {
        someKey: 'someValue',
      });
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith({
        msg: 'testing msg for warning',
        type: 'warning',
        context: {
          someKey: 'someValue',
        },
      });
    });

    test('should call console.warn with stringified params when prettify false', () => {
      config.logs.prettify = false;
      logWarning('testing msg for warning', {
        someKey: 'someValue',
      });
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(
        JSON.stringify({
          type: 'warning',
          msg: 'testing msg for warning',
          context: {
            someKey: 'someValue',
          },
        }),
      );
    });
  });

  describe('#formatLog', () => {
    test('should return the contents as it is if prettify is true', () => {
      const sampleContents = {
        someKey: 'someValue',
        someOtherKey: 'someOtherValue',
      };

      config.logs.prettify = true;
      expect(formatLog(sampleContents)).toStrictEqual(sampleContents);
    });

    test('should return the contents as stringified if prettify is false', () => {
      const sampleContents = {
        someKey: 'someValue',
        someOtherKey: 'someOtherValue',
      };

      config.logs.prettify = false;
      const expectedResult = '{"someKey":"someValue","someOtherKey":"someOtherValue"}';
      expect(formatLog(sampleContents)).toBe(expectedResult);
    });
  });
});
