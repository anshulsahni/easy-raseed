import { createModel } from '../../services/database.js';

import BaseRepository from '../base/repository.js';
import BookSchema from './schema.js';

class BooksRepository extends BaseRepository {
  publicAttribs = [
    'tenant',
    'landlord',
  ];

  static async findByPublicIdOrFail(id) {
    const data = await this.findOne({ id });

    if (!data) {
      throw new Error('Entity Not Found');
    } else {
      return data;
    }

  }
}

export default createModel(BooksRepository, new BookSchema(), 'books');
