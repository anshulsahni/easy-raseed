import { validate } from 'validate.js';

import AppError, { REQUEST_INPUT_VALIDATION_ERROR } from '../../error/app-error.js';
import { forEachInArray, isEmptyArray } from '../../helpers/array.js';

validate.validators.collection = validateCollection;
validate.validators.requiredIf = validateRequiredIf;

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

  rentalData: {
    collection: {
      startMonth: {
        requiredIf: {
          condition: ({ type }) => type === 'monthly',
        },
        type: 'string',
        // format: {
        //   pattern: /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/,
        //   message: 'is not a valid month',
        // },
      },

      endMonth: {
        type: 'string',
        requiredIf: {
          condition: ({ type }) => type === 'monthly',
        },
        // format: {
        //   pattern: /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/,
        //   message: 'is not a valid month',
        // },
      },

      type: {
        presence: true,
        type: 'string',
        format: {
          pattern: /monthly|quarterly|yearly/,
          message: 'contains invalid value',
        },
      },

      amount: {
        presence: true,
        type: 'integer',
      },
    },
  },
};

export function validateCreateInput(inputValues = {}) {
  const error = validate(inputValues, createBookInputConstraints);
  if (error) {
    throw new AppError(REQUEST_INPUT_VALIDATION_ERROR, error);
  }
}

export function validateCollection(collection, options) {
  if (!validate.isArray(collection)) {
    return ' is not array, collection should be array';
  }

  const errors = [];

  /* eslint-disable-next-line consistent-return */
  forEachInArray(collection, (item) => {
    const error = validate(item, options);
    if (error) {
      errors.push(error);
    }
  });

  return isEmptyArray(errors) ? null : errors;
}

export function validateRequiredIf(value, options, _key, attributes) {
  const condition = options.condition;

  const isConditionTrue = condition(attributes);

  if (isConditionTrue && validate.isDefined(value)) {
    return null;
  }

  return ' is required';
}
