import BaseRepository from '../repository.js';

jest.mock('../../../services/database.js');

describe('BaseRepository', () => {
  describe('#toPublicObject', () => {
    test('should remove _id & __v from the object', () => {
      const baseRepo = new BaseRepository();
      baseRepo.toObject = jest.fn().mockReturnValueOnce({
        key1: 'value1',
        key2: 'value2',
        _id: 'willBeRejected',
        __v: 'willAlsoBeRejected',
      });

      const publicObject = baseRepo.toPublicObject();
      expect(publicObject).toStrictEqual({
        key1: 'value1',
        key2: 'value2',
      });
    });
  });
});
