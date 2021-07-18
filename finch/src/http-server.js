import express from 'express';

import { logInfo } from './services/logger.js';

const DEFAULT_PORT = 3000;

export default class HttpServer {
  constructor(options = {}) {
    this.app = express();

    this.options = {
      port: options.port || DEFAULT_PORT,
      middlewares: options.middlewares || [],
    };

    this.initializeMiddlewares();
  }

  start() {
    this.app.listen(this.options.port, '0.0.0.0', () => {
      logInfo('app started', { port: this.options.port });
    });
  }

  initializeMiddlewares() {
    this.options.middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
}
