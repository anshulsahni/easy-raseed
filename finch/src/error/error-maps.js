import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../http/status-codes.js';

export const httpStatusCodeMap = {
  DB_OPERATIONS_ERROR: INTERNAL_SERVER_ERROR,
  REQUEST_INPUT_VALIDATION_ERROR: BAD_REQUEST,
};

export const defaultPublicMessages = {
  DB_OPERATIONS_ERROR: 'Error while executing Database operations',
  REQUEST_INPUT_VALIDATION_ERROR: 'Input values sent in request, failed validation',
};
