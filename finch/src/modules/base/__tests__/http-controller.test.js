import httpMocks from 'node-mocks-http';

import HttpController from '../http-controller.js';

describe('HTTPController', () => {
  let controller;

  beforeEach(() => {
    controller = new HttpController();
  });

  describe('#respondInJson', () => {
    test('should reponse with passed status & data as json', () => {
      const mockResp = httpMocks.createResponse();
      const sampleData = {
        key1: 'value1',
        key2: 'value2',
      };

      controller.respondInJson({
        data: sampleData,
        status: 200,
        response: mockResp,
      });

      expect(mockResp.statusCode).toBe(200);
      expect(mockResp._isJSON()).toBe(true);
      expect(mockResp._isEndCalled()).toBe(true);
      expect(mockResp._getJSONData()).toStrictEqual({
        key1: 'value1',
        key2: 'value2',
      });

    });
  });

  describe('#respondWithError', () => {
    test('should call reponse with status & error object', () => {
      const mockResp = httpMocks.createResponse();
      const sampleError = {
        msg: 'Some error message',
      };

      controller.respondWithError({
        error: sampleError,
        status: 400,
        response: mockResp,
      });

      expect(mockResp.statusCode).toBe(400);
      expect(mockResp._isJSON()).toBe(true);
      expect(mockResp._isEndCalled()).toBe(true);
      expect(mockResp._getJSONData()).toStrictEqual({
        success: false,
        error: sampleError,
      });
    });
  });

  describe('#respondWithResourceCreated', () => {
    test('should call reponse with status 201 & data object', () => {
      const mockResp = httpMocks.createResponse();
      const sampleData = {
        key1: 'value1',
        key2: 'value2',
      };

      controller.respondWithResourceCreated({
        item: sampleData,
        response: mockResp,
      });

      expect(mockResp.statusCode).toBe(201);
      expect(mockResp._isJSON()).toBe(true);
      expect(mockResp._isEndCalled()).toBe(true);
      expect(mockResp._getJSONData()).toStrictEqual({
        success: true,
        item: sampleData,
      });
    });
  });

  describe('#respondAllOk', () => {
    test('should call reponse with status 200 & data as json object', () => {
      const mockResp = httpMocks.createResponse();
      const sampleData = {
        key1: 'value1',
        key2: 'value2',
      };

      controller.respondAllOk({
        item: sampleData,
        response: mockResp,
      });

      expect(mockResp.statusCode).toBe(200);
      expect(mockResp._isJSON()).toBe(true);
      expect(mockResp._isEndCalled()).toBe(true);
      expect(mockResp._getJSONData()).toStrictEqual({
        success: true,
        item: sampleData,
      });
    });
  });

  describe('#respondWithList', () => {
    test('should call reponse with status 200 & data object as items', () => {
      const mockResp = httpMocks.createResponse();
      const sampleData = [
        { key1: 'value1' },
        { key2: 'value2' },
        { key3: 'value3' },
      ];

      controller.respondWithList({
        items: sampleData,
        response: mockResp,
      });

      expect(mockResp.statusCode).toBe(200);
      expect(mockResp._isJSON()).toBe(true);
      expect(mockResp._isEndCalled()).toBe(true);
      expect(mockResp._getJSONData()).toStrictEqual({
        success: true,
        items: sampleData,
      });
    });
  });

});