"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const mailOptions = async (email, subject, message) => {
  let options = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text: message
  };
  return options;
};

var _default = mailOptions;
exports.default = _default;