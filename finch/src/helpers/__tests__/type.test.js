import { isNull, isObject } from '../type.js';

describe('type helpers', () => {
  describe('#isNull', () => {
    test('should return true if null is passed', () => {
      expect(isNull(null)).toBe(true);
    });

    describe('should return false for non-null values', () => {
      test.each([
        [undefined, 'undefined'],
        ['something', 'string'],
        ['', 'empty string'],
        [0, 'zero value'],
        [400, 'non-zero number'],
        [true, 'boolean'],
        [{}, 'object'],
        [[5], 'array with value'],
      ])('isNull(%s) //%s', (value) => {
        expect(isNull(value)).toBe(false);
      });
    });
  });

  describe('#isObject', () => {
    describe('should return true for following usecases', () => {
      test.each([
        [{}, 'empty object'],
        // eslint-disable-next-line no-new-object
        [new Object(), 'using Object class'],
        [new (function something() {})(), 'initialiaze function'],
        // TODO: with array it should return false
        [[5], 'array'],
      ])('isObject(%s) //%s', (value) => {
        expect(isObject(value)).toBe(true);
      });
    });

    describe('should return false for following usecases', () => {
      test.each([
        [undefined, 'undefined'],
        ['something', 'string'],
        ['', 'empty string'],
        [0, 'zero value'],
        [400, 'non-zero number'],
        [true, 'boolean'],
        [null, 'null value'],
      ])('isObject(%s) //%s', (value) => {
        expect(isObject(value)).toBe(false);
      });
    });
  });
});
