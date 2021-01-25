import mongoose from 'mongoose';

import { isValidEmail } from '../../helpers/validators.js';

const { Schema } = mongoose;

export default class TenantSchema extends Schema {
  constructor() {
    super({
      name: {
        type: String,
        minlength: 4,
        required: true,
      },

      email: {
        type: String,
        minlength: 6,
        required: true,
        validate: {
          validator: isValidEmail,
        },
      },
    });
  }
}
