import { validate } from 'validate.js';

import AppError, { REQUEST_INPUT_VALIDATION_ERROR } from '../../error/app-error.js';

const createBookInputConstraints = {
  'tenant.name': {
    presence: true,
    type: 'string',
    length: {
      minimum: 4,
    },
  },

  'tenant.email': {
    presence: true,
    type: 'string',
    email: true,
    length: {
      minimum: 6,
    },
  },

  'landlord.name': {
    presence: true,
    type: 'string',
    length: {
      minimum: 4,
    },
  },

  'landlord.email': {
    presence: true,
    type: 'string',
    email: true,
    length: {
      minimum: 6,
    },
  },

  'landlord.pan': {
    type: 'string',
    length: 10,
  },
};

export function validateCreateInput(inputValues = {}) {
  const error = validate(inputValues, createBookInputConstraints);
  if (error) {
    throw new AppError(REQUEST_INPUT_VALIDATION_ERROR, error);
  }
}
