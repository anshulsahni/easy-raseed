import mongoose from 'mongoose';

export default class Database {
  constructor(options) {
    this.user = options.user;
    this.password = options.password;
    this.host = options.host;
    this.port = options.port;
    this.name = options.name;
  }

  connect() {
    mongoose
      .connection
      .on('open', this.open)
      .on('error', this.onError);

    mongoose.connect(
      `mongodb://${this.host}/${this.name}`,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    );
  }

  open() {
    console.log('connection successfull');
  }

  onError() {
    console.log('Slight technical glitch in connecting to mongo server');
  }
}

const { model, Model } = mongoose;
export { model as createModel };
export { Model as DbRepo };
