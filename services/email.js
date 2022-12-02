const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wildlifedonation06@gmail.com',
    pass: 'suryansh@5476'
  }
});

module.exports = transporter