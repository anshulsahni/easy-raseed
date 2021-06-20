import { getIdRoute } from '../http.js';

describe('http helpers', () => {
  describe('#getIdRoute', () => {
    test('should return string suffixed with /:id', () => {
      expect(getIdRoute('/test')).toBe('/test/:id');
    });

    test('should return /:id when undefined is passed', () => {
      expect(getIdRoute()).toBe('/:id');
    });
  });
});
