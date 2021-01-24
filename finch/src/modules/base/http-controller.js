import { httpResoponseCodes } from './constants.js'


export default class HttpController {
  respondInJson({ data, status, response }) {
    response
      .status(status)
      .json(data);
  }

  respondWithError({ error = {}, status, response }) {
    const data = {
      error,
      success: false,
    };

    this.respondInJson({ data,  status, response });
  }

  respondWithResourceCreated({ item = {}, response }) {
    const data = {
      success: true,
      item,
    };

    const status = httpResoponseCodes.RESOURCE_CREATED;

    this.respondInJson({ data, response, status });
  }

  respondAllOk({ item = {}, response }) {
    const data = {
      success: true,
      item,
    };

    const status = httpResoponseCodes.OK;

    this.respondInJson({ data, status, response });
  }

  respondWithList({ items = [], response }) {
    //@TODO Validate items if items is array or not,
    const data = {
      success: true,
      items,
    };

    const status = httpResoponseCodes.OK;

    this.respondAllOkIn({ items, response, status });
  }
}