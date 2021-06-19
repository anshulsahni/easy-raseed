import BookService from '../service.js';
import BookController from '../controller.js';

describe('BookController', () => {
  test('should have baseRoute as /receipts',() => {
    const controller = new BookController({});
    expect(controller.baseRoute).toBe('/receipts');
    expect(controller.service).toBe(BookService);
  });
});