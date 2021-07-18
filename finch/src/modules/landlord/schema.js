import mongoose from 'mongoose';

import { isValidEmail, isValidPanNumber } from '../../helpers/validators.js';

const { Schema } = mongoose;

export default class LandlordSchema extends Schema {
  constructor() {
    super({
      name: {
        type: String,
        minlength: 4,
        required: true,
        select: true,
      },

      email: {
        type: String,
        minlength: 6,
        required: true,
        validate: {
          validator: isValidEmail,
        },
        select: true,
      },

      pan: {
        type: String,
        minlength: 10,
        maxlength: 10,
        validate: {
          validator: isValidPanNumber,
        },
        select: true,
      },
    });
  }
}
