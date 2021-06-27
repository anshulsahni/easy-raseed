import { INTERNAL_SERVER_ERROR } from "../http/status-codes.js";

export const httpStatusCodeMap = {
  DB_OPERATIONS_ERROR: INTERNAL_SERVER_ERROR,
};

export const defaultPublicMessages = {
  DB_OPERATIONS_ERROR: 'Error while executing Database operations',
};
