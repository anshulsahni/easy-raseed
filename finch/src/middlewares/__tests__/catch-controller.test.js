import httpMocks from 'node-mocks-http';

import CatchController from '../catch-controller.js';

describe('CatchController', () => {
  describe('#constructor', () => {
    test('should assign passed app argument as its app property', () => {
      const app = { mockApp: true };
      const controller = new CatchController({ app });
      expect(controller.app).toStrictEqual({ mockApp: true });
    });
  });

  describe('#handleError', () => {
    test('should call respond with error object', () => {
      const mockReq = httpMocks.createRequest();
      const mockRes = httpMocks.createResponse();

      const mockError = {
        publicMessage: 'mock error message',
        httpStatusCode: 400,
        errorCode: 'MOCK_ERROR_CODE',
      };

      (new CatchController({})).handleError(mockError, mockReq, mockRes);
      expect(mockRes.statusCode).toBe(400);
      expect(mockRes._isJSON()).toBe(true);
      expect(mockRes._isEndCalled()).toBe(true);
      expect(mockRes._getJSONData()).toStrictEqual({
        error: {
            description: 'mock error message',
            code: 'MOCK_ERROR_CODE',
          },
      });
    });
  });

  describe('#init', () => {
    test('should call use method of with handleError function', () => {
      const mockApp = {
        use: jest.fn(),
      };

      const controller = new CatchController({ app: mockApp });
      controller.init();

      expect(mockApp.use).toBeCalledTimes(1);
    });
  });
});
