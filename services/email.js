const nodemailer = require('nodemailer');

async function main() {
  // var transport = nodemailer.createTransport({
  //   host: 'smtp.zoho.eu',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: process.env.EMAIL_SERVICE_ID,
  //     pass: process.env.EMAIL_SERVICE_PASSWORD
  //   }
  // });

  // let info = await transport.sendMail({
  //   from: process.env.EMAIL_SERVICE_ID,
  //   to: "tanujatiwari04@gmail.com, suryansh06shahi@gmail.com",
  //   subject: "Main nahi khel raha ✔",
  //   text: "Test email", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });

  // const smtpConfig = {
  //   host: smtpHost,
  //   port: smtpPort,
  //   secure: false
  // };

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.zoho.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: 'fakemyntra@zohomail.in',
  //     pass: 'suryansh@5476'
  //   }
  // });

  // const mailOptions = {
  //   from: 'fakemyntra@zohomail.in', // sender address
  //   to: 'tanujatiwari04@gmail.com, suryansh06shahi@gmail.com', // list of receivers
  //   subject: 'Hello', // Subject line
  //   text: 'Hello world?', // plain text body
  //   html: '<b>Hello world?</b>' // html body
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  // });
}

module.exports = main