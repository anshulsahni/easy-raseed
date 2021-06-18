import UserRepository from '../repository.js';

describe('#BooksRepository', () => {
  describe('findByPublicIdOrFail', () => {
    test('should return the object returned by model', async () => {
      const _book = {
        id: 'sampleId12',
        tenant: {
          name: 'Tenant Name',
          email: 'tenant@gmail.com',
        },
        landlord: {
          name: 'Landlord Name',
          email: 'landlord@gmail.com',
        },
        receipts: [],
      };

      UserRepository.findOne = jest.fn();
      UserRepository.findOne.mockReturnValueOnce(_book);

      const result = await UserRepository
        .findByPublicIdOrFail('sampleId12');

      expect(result).toEqual(_book);
    });

    it('should throw an error when model returns null', () => {
      UserRepository.findOne = jest.fn();
      UserRepository.findOne.mockReturnValueOnce(null);

      expect(async () => {
        await UserRepository.findByPublicIdOrFail('anshul');
      }).rejects.toThrow();
    });

  });
});