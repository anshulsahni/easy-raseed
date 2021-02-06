import { json } from 'express';

import config from '../config/index.js';

import ReceiptController from './modules/books/controller.js';

import HttpServer from './http-server.js';
import Database from './services/database.js';
import {createRequestContext} from './middlewares/hooks.js';

const middlewares = [
  json(),
  (req, _1, next) => {
    createRequestContext(req.body.id);
    next();
  }
];

const server = new HttpServer({
  port: 8888,
  middlewares,
});

const database = new Database(config.database);


server.start();

database.connect();

new ReceiptController({ app: server.app }).initRoutes();
