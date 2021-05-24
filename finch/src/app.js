import { json } from 'express';
import cors from 'cors';

import config from '../config/index.js';

import ReceiptController from './modules/books/controller.js';

import HttpServer from './http-server.js';
import Database from './services/database.js';

const middlewares = [
  json(),
  cors({
    origin: config.client.origin,
  }),
];

const server = new HttpServer({
  port: 8888,
  middlewares,
});

const database = new Database(config.database);


server.start();

database.connect();

new ReceiptController({ app: server.app }).initRoutes();
