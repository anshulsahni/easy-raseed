import AppError, { DB_OPERATIONS_ERROR } from '../app-error.js';

describe('AppError', () => {
  describe('#constructor', () => {
    test('should assign errorCode sent in argument to as its property', () => {
      const appError = new AppError('RANDOM_ERROR_CODE');
      expect(appError.errorCode).toBe('RANDOM_ERROR_CODE');
    });

    test('should public message as its property if passed', () => {
      const appError = new AppError(null, 'Random Error msg');
      expect(appError.publicMessage).toBe('Random Error msg');
    });

    test('should assign default publicMessage according to error code', () => {
      const appError = new AppError(DB_OPERATIONS_ERROR);
      expect(appError.publicMessage).toBe('Error while executing Database operations');
    });

    test('should assign httpStatusCode according to errorCode', () => {
      const appError = new AppError(DB_OPERATIONS_ERROR);
      expect(appError.httpStatusCode).toBe(500);
    });
  });
});