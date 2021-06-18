import BooksService from '../service.js';
import Book from '../repository.js';

jest.mock('../repository.js');

describe('BooksService', () => {
  describe('#create', () => {
    beforeEach(() => {
      Book.mockClear();
    });

    test('should initialize repository class once',async () => {
      const sampleInput = {
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

      Book.mockReturnValueOnce({
        save: () => ({
          toPublicObject: () => {},
        }),
      });

      await BooksService.create(sampleInput);
      expect(Book).toHaveBeenCalledTimes(1);
      expect(Book).toHaveBeenCalledWith(sampleInput);

    });

    test('should call repository function with right arguments',async () => {
      const mockResult = {
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

      Book.mockReturnValueOnce({
        save: () => ({
          toPublicObject: () => mockResult,
        }),
      });

      const actualResult = await BooksService.create({});
      expect(actualResult).toStrictEqual(mockResult);
    });

    test('should throw exception if repo methods throws an error',async () => {
      Book.mockReturnValueOnce({
        save: jest.fn().mockImplementation(() => {
          throw new Error();
        }),
      });

      await expect(BooksService.create({}))
        .rejects
        .toThrow(Error);
    });
  });
});