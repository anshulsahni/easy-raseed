import { getRequestContext } from '../../middlewares/hooks.js';
import Book from './repository.js';

export default class BooksService {
  static async create(input) {
    const book = new Book(input);

    try {
      return (await book.save()).toPublicObject();
    } catch (error) {
      console.log({error});
    }
  }

  static async getById(id) {
    console.log(getRequestContext(), 'from service');
    try {
      return (await Book.findByPublicIdOrFail(id))
        .toPublicObject();
    } catch(error) {
      console.log({error});
    }
  }
}
