import { defaultPublicMessages, httpStatusCodeMap } from './error-maps.js';

export default class AppError extends Error {
  constructor(errorCode, publicMessage) {
    super();
    this.errorCode = errorCode;
    this.publicMessage = publicMessage || defaultPublicMessages[errorCode];
    this.httpStatusCode = httpStatusCodeMap[errorCode];

    Error.captureStackTrace(this, this.constructor);
  }
}

export const DB_OPERATIONS_ERROR = 'DB_OPERATIONS_ERROR';
export const INVALID_LOGIC_ERROR = 'INVALID_LOGIC_ERROR';

export const REQUEST_INPUT_VALIDATION_ERROR = 'REQUEST_INPUT_VALIDATION_ERROR';
