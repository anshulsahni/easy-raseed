import CrudController from '../base/crud-controller.js';

import BookService from './service.js';

export default class ReceiptController extends CrudController {
  service = BookService;
  baseRoute = '/books';
}
