import express from 'express';


const DEFAULT_PORT = 3000;

export default class HttpServer {
  constructor(options = {}) {
    this.app = express();

    this.options = {
      port: options.port || DEFAULT_PORT,
      middlewares: options.middlewares || [],
    }

    this.initializeMiddlewares()
  }

  start() {
    this.app.listen(this.options.port, '0.0.0.0',() => {
      console.log(
        `App started on port: ${this.options.port}`
      );
    });
  }

  initializeMiddlewares() {
    this.options.middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }
}
