import { getRequestContext } from '../../middlewares/hooks.js';
import CrudController from '../base/crud-controller.js';

import BookService from './service.js';

export default class ReceiptController extends CrudController {
  service = BookService;
  baseRoute = '/receipts';

  getById(req, res) {
    console.log(getRequestContext(), 'from module controller');
    super.getById(req,res);
  }
}
