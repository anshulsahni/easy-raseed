import { isValidEmail } from '../validators.js';

describe('Validator Helpers', () => {
  describe('#isValidEmail', () => {
    describe('should return true for following cases', () => {
      test.each([
        ['sample@something.com'],
        ['sample_withunderscore@something.com'],
        ['withtwodotsindomain@something.co.in'],
        ['something.withdot@something.com'],
      ])('isValidEmail(%s)', (value) => {
        expect(isValidEmail(value)).toBe(true);
      });
    });

    describe('should return false for following cases', () => {
      test.each([['sample@something'], ['withouttld@something'], ['withoutAttheratesymbol']])(
        'isValidEmail(%s)',
        (value) => {
          expect(isValidEmail(value)).toBe(false);
        },
      );
    });
  });
});
