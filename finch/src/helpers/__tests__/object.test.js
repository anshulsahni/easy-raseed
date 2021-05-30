import { omitRecursive } from '../object.js';

describe('#helpers', () => {
  describe('##object', () => {
    describe('###omitRecursive', () => {

      test('should omit properties from flat object', () => {
        const flatObj = {
          prop1: 'value1',
          prop2: 'value2',
          prop3: 'value3',
        };

        const result = omitRecursive(flatObj, ['prop2', 'prop3']);

        expect(result).toEqual({prop1: 'value1'});

      });

      test('should omit properties from a nested object', () => {
        const nestedObj = {
          prop1: 'value1',
          prop2: 'value2',
          nested: {
            prop1: 'value1',
            prop2: 'value2',
            prop3: 'value3'
          },
        };

        const result = omitRecursive(nestedObj, ['prop2', ['prop3']]);

        expect(result).toEqual({
          prop1: 'value1',
          nested: { prop1: 'value1' },
        });
      });

      test('should send the object as it is if no props are sent', () => {
        /* Flat object */
        expect(omitRecursive({ prop: 'value' }))
          .toEqual({ prop: 'value' });

        /* Nested Object */
        expect(omitRecursive({
          prop: 'value',
          nested: { prop: 'value' },
        })).toEqual({
          prop: 'value',
          nested: { prop: 'value' },
        });
      });

      test('should send an empty object if no argument is passed', () => {
        const result = omitRecursive({});
        expect(Object.keys(result)).toHaveLength(0);
      });

    });
  });
});