"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const smtp = () => {
  let smtpTransport = _nodemailer.default.createTransport({
    direct: true,
    host: "smtp.yandex.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    secure: true
  });

  return smtpTransport;
};

var _default = smtp;
exports.default = _default;