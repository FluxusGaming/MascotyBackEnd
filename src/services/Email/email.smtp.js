import nodemailer from "nodemailer";
const smtp = () => {
  let smtpTransport = nodemailer.createTransport({
    direct: true,
    host: "smtp.yandex.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });
  return smtpTransport;
};

export default smtp;
