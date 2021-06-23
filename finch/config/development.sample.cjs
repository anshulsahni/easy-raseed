module.exports = {
  database: {
    host: 'mongo',
    port: 27017,
    name: 'raseed_book',
  },

  /* Sending 📫Emails */
  smtp: {
    /* example is given for https://mailtrap.io/ */
    host: 'smtp.mailtrap.io',
    port: 2525,
    user: "YOUR_USER_NAME",
    password: 'YOUR_PASSWORD',
  },

  emailSender: 'noreply@easyraseed.in',
};
