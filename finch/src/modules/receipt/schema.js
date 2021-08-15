import { BaseSchema } from '../../services/database.js';

export default class ReceiptSchema extends BaseSchema {
  constructor() {
    super({
      amount: {
        type: Number,
        min: 0,
        required: true,
        select: true,
      },

      startDate: {
        type: Date,
        required: true,
        select: true,
      },

      endDate: {
        type: Date,
        required: true,
        select: true,
      },

      paid: {
        type: Boolean,
        select: true,
        default: false,
      },
    });
  }
}
