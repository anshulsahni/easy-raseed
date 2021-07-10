import * as errorCodes from '../app-error.js';
import {
  defaultPublicMessages,
  httpStatusCodeMap,
} from '../error-maps.js';

describe('erroCodes', () => {
    const errors = Object
      .keys(errorCodes)
      .filter(err => err !== 'default');

  describe('defaultPublicMessages', () => {
    describe('should contain default public message for each ', () => {
      test.each(errors)('%p', (code) => {
        const publicMessage = defaultPublicMessages[code];

        expect(typeof publicMessage).toBe('string');
        expect(publicMessage).toBeTruthy();
      });
    });
  });

  describe('httpStatusMap', () => {
    describe('should contain default public message for each ', () => {
      test.each(errors)('%p', (code) => {
        const statusCode = httpStatusCodeMap[code];

        expect(typeof statusCode).toBe('number');
        expect(statusCode).toBeTruthy();
      });
    });
  });


});
