import Book from './repository.js';

import EmailService from '../../services/email.js';

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
        sendEmailToTenant(book.tenant);
      }

      return book.toPublicObject();

    } catch (error) {
      console.log({error});
    }
  }

  static async getById(id) {
    try {
      return (await Book.findByPublicIdOrFail(id))
        .toPublicObject();
    } catch(error) {
      console.log({error});
    }
  }

}

function sendEmailToTenant(tenant) {
  (new EmailService())
    .init()
    .setReceiver(tenant.email)
    .setContent(`<strong>In future you'll receive PDF here</strong>`)
    .send();
}

function sendEmailToLandlord(landlord, tenant) {
  (new EmailService())
    .init()
    .setReceiver(landlord.email)
    .setContent(`<strong>${tenant.name} have sent you the rent receipts</strong>`)
    .send();
}
