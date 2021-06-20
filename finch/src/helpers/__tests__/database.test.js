import { publicId } from '../database.js';

describe('Database helpers', () => {
  describe('#publicId()', () => {
    test('should return string of length 10', () => {
      const result = publicId();
      expect(result.length).toBe(10);
    });

    test('should return 10 alphanumeric characters  ', () => {
      expect(publicId()).toMatch(/([a-z]|[A-Z]|[0-9]){10}/);
    });
  });
});
