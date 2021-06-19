import mongoose from 'mongoose';
import Database from '../database.js';

jest.mock('mongoose');

describe('DatabaseService', () => {
  describe('#connect', () => {
    beforeEach(() => {
    });

    test('should call mongoose.connect with right arguments',async () => {
      expect.assertions(5);
      const sampleOptions = {
        host: '127.0.0.1',
        name: 'something',
      };

      mongoose.connection = {
        on: jest.fn().mockReturnThis(),
      };

      const database = new Database(sampleOptions);
      await database.connect();

      expect(mongoose.connect).toBeCalledTimes(1);
      expect(mongoose.connect).toBeCalledWith(
        `mongodb://127.0.0.1/something`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      );
      expect(mongoose.connection.on).toBeCalledTimes(2);
      expect(mongoose.connection.on).toBeCalledWith(
        'open',
        database.open,
      );
      expect(mongoose.connection.on).toBeCalledWith(
        'error',
        database.onError,
      );

    });
  });
});
