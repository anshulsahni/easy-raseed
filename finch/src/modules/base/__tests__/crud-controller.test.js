import express from 'express';
import httpMocks from 'node-mocks-http';

import CrudController from '../crud-controller.js';

describe('CrudController', () => {
  let mockService, crudController;
  beforeEach(() => {
    crudController = new CrudController({});
    mockService = {};
    crudController.service = mockService;
  });

  describe('#create', () => {
    test('should call service#create() method with request payload',async () => {

      const samplePayload = {
        key1: 'value1',
        key2: 'value2',
      };
      const mockReq = httpMocks.createRequest({
        body: samplePayload,
      });
      const mockRes = httpMocks.createResponse();
      crudController.service.create = jest.fn().mockReturnValueOnce(samplePayload);

      await crudController.create(mockReq, mockRes);

      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(mockService.create).toHaveBeenCalledWith(samplePayload);
      expect(mockRes.statusCode).toBe(201);
      expect(mockRes._isJSON()).toBe(true);
      expect(mockRes._isEndCalled()).toBe(true);
      expect(mockRes._getJSONData()).toStrictEqual({
        item: samplePayload,
        success: true,
      });

    });
  });

  describe('#getById', () => {
    test('should call service#getById() method with id in request.params',async () => {
      const mockReq = httpMocks.createRequest({
        params: { id: 'sampleId' },
      });
      const mockRes = httpMocks.createResponse();

      crudController.service.getById = jest.fn().mockReturnValueOnce({
        sample: 'response',
      });

      await crudController.getById(mockReq, mockRes);

      expect(mockService.getById).toHaveBeenCalledTimes(1);
      expect(mockService.getById).toHaveBeenCalledWith('sampleId');
      expect(mockRes.statusCode).toBe(200);
      expect(mockRes._isJSON()).toBe(true);
      expect(mockRes._isEndCalled()).toBe(true);
      expect(mockRes._getJSONData()).toStrictEqual({
        item: { sample: 'response' },
        success: true,
      });

    });
  });

  describe('#update', () => {
    test('should respond in JSON', () => {
      const mockReq = httpMocks.createRequest();
      const mockRes = httpMocks.createResponse();

      crudController.update(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes._isJSON()).toBe(true);
      expect(mockRes._isEndCalled()).toBe(true);

    });
  });

  describe('#list', () => {
    test('should respond in JSON', () => {
      const mockReq = httpMocks.createRequest();
      const mockRes = httpMocks.createResponse();

      crudController.list(mockReq, mockRes);

      expect(mockRes.statusCode).toBe(200);
      expect(mockRes._isJSON()).toBe(true);
      expect(mockRes._isEndCalled()).toBe(true);

    });

  });

  describe('#initRoutes', () => {
    test('should call REST methods with correct args', () => {
      const app = express();
      const controller = new CrudController({ app });
      controller.baseRoute = '/test';
      controller.handleException = jest.fn();
      controller.router.post = jest.fn();
      controller.router.get = jest.fn();
      controller.router.patch = jest.fn();

      controller.initRoutes();

      expect(controller.router.post).toHaveBeenCalledTimes(1);
      expect(controller.router.post.mock.calls[0][0]).toBe('/test');
      expect(controller.handleException.mock.calls[0][0].name).toBe('bound create');

      expect(controller.router.get).toHaveBeenCalledTimes(2);
      expect(controller.router.get.mock.calls[0][0]).toBe('/test/:id');
      expect(controller.handleException.mock.calls[1][0].name).toBe('bound getById');
      expect(controller.router.get.mock.calls[1][0]).toBe('/test');
      expect(controller.router.get.mock.calls[1][1].name).toBe('bound list');

      expect(controller.router.patch).toHaveBeenCalledTimes(1);
      expect(controller.router.patch.mock.calls[0][0]).toBe('/test/:id');
      expect(controller.router.patch.mock.calls[0][1].name).toBe('bound update');

    });
  });

  describe('#handleException', () => {
    test('should return a callback which returns passed callback in return value, ', () => {
      const mockControllerFn = jest.fn().mockReturnValue(new Promise(() => {}));

      const req = { mockReq: true };
      const res = { mockRes: true };
      crudController.handleException(mockControllerFn)(req, res);

      expect(mockControllerFn).toHaveBeenCalledTimes(1);
      expect(mockControllerFn).toHaveBeenCalledWith(req, res);

    });

    test('should  call next callback when controller rejects', () => {
      const mockCatch = jest.fn();
      const mockControllerFn = jest
        .fn()
        .mockReturnValue({ catch: mockCatch });
      const mockNext = jest.fn();

      crudController
        .handleException(mockControllerFn)({}, {}, mockNext);

      expect(mockCatch).toHaveBeenCalledWith(mockNext);

    });
  });
});
