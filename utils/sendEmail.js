const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,  // 🔄 changed from 465 to 587
  secure: false, // false for TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: `"Goal Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};

module.exports = sendEmail;
