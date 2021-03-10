"use strict";

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB
} = process.env;
console.log(DB_HOST);
module.exports = {
  HOST: DB_HOST,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD,
  DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};