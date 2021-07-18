import nodemailer from 'nodemailer';
import EmailService, { validateEmailParams } from '../email.js';

jest.mock('nodemailer');

describe('EmailService', () => {
  describe('#constructor', () => {
    let email;

    beforeEach(() => {
      nodemailer.createTransport = jest.fn().mockReturnValueOnce({
        mockTransporter: true,
      });
      email = new EmailService();
    });

    test('should call createTransport with correct paramaters', () => {
      expect(nodemailer.createTransport).toBeCalledTimes(1);
      expect(nodemailer.createTransport).toBeCalledWith({
        host: 'email.mock.host',
        port: 1234,
        auth: {
          user: 'mock_user',
          pass: 'mock_password',
        },
      });
    });

    test('should assign transporter the returned value of createTransport', () => {
      expect(email.transporter).toStrictEqual({
        mockTransporter: true,
      });
    });

    test('should initiate emailParams with an empty object', () => {
      expect(email.emailParams).toStrictEqual({});
    });
  });

  describe('setter methods', () => {
    let email;

    beforeEach(() => {
      email = new EmailService();
    });

    describe('#setSender()', () => {
      test('should set from in emailParams with "senderEmail"', () => {
        email.setSender('someone@someone.com');

        expect(email.emailParams.from).toBe('someone@someone.com');
      });

      test('should return this', () => {
        const result = email.setSender();
        expect(result).toBeInstanceOf(EmailService);
      });
    });

    describe('#receiverEmail()', () => {
      test('should set from in emailParams with "receiverEmail"', () => {
        email.setReceiver('someone@someone.com');

        expect(email.emailParams.to).toBe('someone@someone.com');
      });

      test('should return this', () => {
        const result = email.setReceiver();
        expect(result).toBeInstanceOf(EmailService);
      });
    });

    describe('#setContent()', () => {
      test('should set from in emailParams with "bodyContent"', () => {
        email.setContent('<html><body>This is something</body></html>');

        expect(email.emailParams.html).toBe('<html><body>This is something</body></html>');
      });

      test('should return this', () => {
        const result = email.setContent();
        expect(result).toBeInstanceOf(EmailService);
      });
    });
  });

  describe('#send()', () => {
    test('should call transporter.sendEamil with params & return value retrieved from it', async () => {
      const mockSendMail = jest.fn().mockReturnValueOnce('mockInfoId');
      nodemailer.createTransport = jest.fn().mockReturnValueOnce({
        sendMail: mockSendMail,
      });
      const email = new EmailService();

      const returnedInfoId = await email
        .setSender('mock@sender.com')
        .setReceiver('mock@receiver.com')
        .setContent('<html><body>Mock Content</body></html>')
        .send();

      expect(mockSendMail).toBeCalledTimes(1);
      expect(mockSendMail).toBeCalledWith({
        from: 'mock@sender.com',
        to: 'mock@receiver.com',
        html: '<html><body>Mock Content</body></html>',
      });
      expect(returnedInfoId).toBe('mockInfoId');
    });

    test('should raise exceptions on invalid email sender', async () => {
      const email = new EmailService();
      await expect(
        email
          .setSender('invalidsenderemail')
          .setReceiver('mock@receiver.com')
          .setContent('<html><body>Mock Content</body></html>')
          .send(),
      ).rejects.toThrowError("Email can't be send without all mandatory paramets");
    });

    test('should raise exceptions on invalid email receiver', async () => {
      const email = new EmailService();
      await expect(
        email
          .setSender('mock@sender.com')
          .setReceiver('invalidreceiver')
          .setContent('<html><body>Mock Content</body></html>')
          .send(),
      ).rejects.toThrowError("Email can't be send without all mandatory paramets");
    });

    test('should raise exceptions when content is not set', async () => {
      const email = new EmailService();
      await expect(
        email.setSender('mock@sender.com').setReceiver('mock@receiver.com').send(),
      ).rejects.toThrowError("Email can't be send without all mandatory paramets");
    });

    test('should raise exception if an error is thrown by sendMail', async () => {
      const mockSendMail = jest.fn().mockImplementation(() => {
        throw new Error('mock email error');
      });
      nodemailer.createTransport = jest.fn().mockReturnValueOnce({
        sendMail: mockSendMail,
      });

      const email = new EmailService();

      await expect(
        email
          .setSender('mock@sender.com')
          .setReceiver('mock@receiver.com')
          .setContent('<html><body>Mock Content</body></html>')
          .send(),
      ).rejects.toThrowError('mock email error');
    });
  });
});

describe('#validateEmailParams()', () => {
  test('should return true if emails are valid & html is present', () => {
    expect(
      validateEmailParams({
        to: 'someone@sender.com',
        from: 'someoneelse@receiver.com',
        html: 'any_content',
      }),
    ).toBe(true);
  });

  test('should raise excpetion if to email is invalid', () => {
    expect(() => {
      validateEmailParams({
        to: 'someonesender.com',
        from: 'someoneelse@receiver.com',
        html: 'any_content',
      });
    }).toThrowError("Email can't be send without all mandatory paramets");
  });

  test('should raise excpetion if from email is invalid', () => {
    expect(() => {
      validateEmailParams({
        to: 'someone@sender.com',
        from: 'someoneelsereceiver.com',
        html: 'any_content',
      });
    }).toThrowError("Email can't be send without all mandatory paramets");
  });

  test('should raise excpetion if emailParams.html is not present', () => {
    expect(() => {
      validateEmailParams({
        to: 'someone@sender.com',
        from: 'someoneelse@receiver.com',
      });
    }).toThrowError("Email can't be send without all mandatory paramets");
  });
});
