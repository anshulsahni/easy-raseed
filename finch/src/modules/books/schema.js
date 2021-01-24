import mongoose from 'mongoose';

import { publicId } from '../../helpers/database.js';

const { Schema } = mongoose;

import TenantSchema from '../tenant/schema.js';
import LandlordSchema from '../landlord/schema.js';

export default class ReceiptBookSchema extends Schema {
  constructor() {
    super({
      id: {
        type: String,
        default: publicId,
        index: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        select: true,
      },

      tenant: {
        type: new TenantSchema(),
        required: true,
        select: true,
      },

      landlord: {
        type: new LandlordSchema(),
        required: true,
        select: true,
      },
    });
  }
}
