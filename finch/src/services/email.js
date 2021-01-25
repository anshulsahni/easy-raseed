import nodemailer from 'nodemailer';

import config from '../../config/index.js';

const { emailSender, smtp } = config;

export default class Email {

  constructor() {
    this.sender = emailSender;
  }

  init() {
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: {
        user: smtp.user,
        pass: smtp.password,
      },
    });

    return this;
  }

  setSender(senderEmail) {
    this.from = senderEmail;
    return this;
  }

  setReceiver(receiverEmail) {
    this.to = receiverEmail;
    return this;
  }

  setContent(bodyContent) {
    this.html = bodyContent;
    return this;
  }

  async send() {
    const { transporter, from, to, html } = this;
    try {
      const infoId = await transporter.sendMail({ from, to, html });

      console.log({ infoId });
    } catch (error) {
      console.log({error});
    }
  }
}
