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

  describe('#getById', () => {
    beforeEach(() => {
      Book.mockClear();
    });

    test('should call Book#findByPublicId once with right args',async () => {
      Book.findByPublicIdOrFail = jest.fn().mockImplementation(() => ({
        toPublicObject: () => {},
      }));

      await BooksService.getById('sampleId');
      expect(Book.findByPublicIdOrFail).toHaveBeenCalledTimes(1);
      expect(Book.findByPublicIdOrFail).toHaveBeenCalledWith('sampleId');

    });

    test('should throw an exception if exception is thrown repo methods',async () => {
      Book.findByPublicIdOrFail = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await expect(BooksService.getById('sampleId'))
        .rejects
        .toThrow(Error);
    });
  });
});
