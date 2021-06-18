import Book from './repository.js';

export default class BooksService {
  static async create(input) {
    const book = new Book(input);

    try {
      return (await book.save()).toPublicObject();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      return (await Book.findByPublicIdOrFail(id))
        .toPublicObject();
    } catch(error) {
      throw error;
    }
  }
}
