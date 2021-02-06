import { Router as ExpressRouter } from 'express';

import { getIdRoute } from '../../helpers/http.js';
import { getRequestContext } from '../../middlewares/hooks.js';

import HttpController from './http-controller.js';

export default class CrudController extends HttpController {
  constructor({ app, service }) {
    super();
    this.app = app;
    this.router = ExpressRouter();
  }

  async create(request, response) {
    const input = request.body;

    const item = await this.service.create(input);

    this.respondWithResourceCreated({ item, response });
  }

  async getById(request, response) {
    const id = request.params.id;

    console.log(getRequestContext(), 'from crud controller');
    const item = await this.service.getById(id);
    this.respondAllOk({ item, response });
  }

  update(request, response) {
    this.respondInJson({ status: 200, response });
  }

  list(request, response) {
    this.respondInJson({ status: 200, response });
  }

  initRoutes() {
    const idRoute = getIdRoute(this.baseRoute);

    this.router.post(this.baseRoute, this.create.bind(this));
    this.router.get(idRoute, this.getById.bind(this));
    this.router.get(this.baseRoute, this.list.bind(this));
    this.router.patch(idRoute, this.update.bind(this));

    this.app.use(this.router);
  }
}
