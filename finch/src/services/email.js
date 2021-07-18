import nodemailer from 'nodemailer';

import config from '../../config/index.js';

import { isValidEmail } from '../helpers/validators.js';

const { smtp } = config;

const nodeMailerOptions = {
  host: smtp.host,
  port: smtp.port,
  auth: {
    user: smtp.user,
    pass: smtp.password,
  },
};

export default class Email {
  constructor() {
    this.transporter = nodemailer.createTransport(nodeMailerOptions);

    this.emailParams = {};
  }

  setSender(senderEmail) {
    this.emailParams.from = senderEmail;
    return this;
  }

  setReceiver(receiverEmail) {
    this.emailParams.to = receiverEmail;
    return this;
  }

  setContent(bodyContent) {
    this.emailParams.html = bodyContent;
    return this;
  }

  async send() {
    if (validateEmailParams(this.emailParams)) {
      try {
        const infoId = await this.transporter.sendMail({ ...this.emailParams });

        return infoId;
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new Error('invalid email params');
    }
  }
}

export function validateEmailParams(emailParams) {
  if (isValidEmail(emailParams.to) && isValidEmail(emailParams.from) && emailParams.html)
    return true;

  throw new Error("Email can't be send without all mandatory paramets");
}
