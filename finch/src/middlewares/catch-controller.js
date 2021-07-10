import HttpController from '../modules/base/http-controller.js';

export default class CatchController extends HttpController {
  constructor({ app }) {
    super();
    this.app = app;
  }

  /**
   * Following function needs four arguments,
   * without them express won't consider it for catching errors
   *
   * For more 👉 https://expressjs.com/en/guide/error-handling.html
   */
  handleError(error, _request, response, _next) {
    const {
      publicMessage,
      httpStatusCode: status,
      errorCode,
    } = error;

    const errorData = {
      description: publicMessage,
      code: errorCode,
    };

    this.respondWithError({ errorData, status, response });
  }

  init() {
    this.app.use(this.handleError.bind(this));
  }
}
