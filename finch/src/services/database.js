import mongoose from 'mongoose';
import { logError, logInfo } from './logger.js';

export default class Database {
  constructor(options) {
    this.user = options.user;
    this.password = options.password;
    this.host = options.host;
    this.port = options.port;
    this.name = options.name;
  }

  connect() {
    mongoose.connection.on('open', this.open).on('error', this.onError);

    const connectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose.connect(`mongodb://${this.host}/${this.name}`, connectOptions);
  }

  open() {
    logInfo('connection to mongodb successfull');
  }

  onError(error) {
    logError('Error in connecting to mongodb', error);
    process.exit(1);
  }
}

const { model, Model, Schema } = mongoose;
export { model as createModel };
export { Model as DbRepo };
export { Schema as BaseSchema };
