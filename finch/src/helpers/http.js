import { response } from "express";

export const getIdRoute = route => `${route}/:id`;


/**
 * Calls next on exception so as to forward the error to catch controller
 * @param {Function} controller
 */
export const forwardException = (controller) => (
  request,
  response,
  next,
) => {
  controller(request, response).catch(next);
}
