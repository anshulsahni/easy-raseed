import AppError, { DB_OPERATIONS_ERROR } from '../../error/app-error.js';
import EmailService from '../../services/email.js';

import Book from './repository.js';

export default class BooksService {
  static async create(input) {
    let book = new Book(input);

    const shouldSendEmail = {
      toLandlord: input?.landlord?.sendEmail,
      toTenant: input?.tenant?.sendEmail,
    };

    try {
      book = await book.save();

      if (shouldSendEmail.toLandlord) {
        sendEmailToLandlord(book.landlord, book.tenant);
      }

      if (shouldSendEmail.toTenant) {
        sendEmailToTenant(book.tenant, book.landlord);
      }

      return book.toPublicObject();

    } catch (error) {
      throw new AppError(DB_OPERATIONS_ERROR);
    }
  }

  static async getById(id) {
    try {
      return (await Book.findByPublicIdOrFail(id))
        .toPublicObject();
    } catch(error) {
      throw new Error(error);
    }
  }

}

function sendEmailToTenant(tenant, landlord) {
  (new EmailService())
    .setSender(landlord.email)
    .setReceiver(tenant.email)
    .setContent(`<strong>In future you'll receive PDF here</strong>`)
    .send();
}

function sendEmailToLandlord(landlord, tenant) {
  (new EmailService())
    .setSender(tenant.email)
    .setReceiver(landlord.email)
    .setContent(`<strong>${tenant.name} have sent you the rent receipts</strong>`)
    .send();
}
