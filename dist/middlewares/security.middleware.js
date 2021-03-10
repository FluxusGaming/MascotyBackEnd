"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = exports.validateRegister = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

var _init = _interopRequireDefault(require("../models/init.db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = _init.default.models.USERS;

const validateRegister = (req, res, next) => {
  /* Nombre de usuario - minimo 3 letras */
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).send({
      message: "Hey, tu usuario debe contener al menos 3 caracteres."
    });
  }
  /* Contraseña con 6 caracteres mínimo*/


  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      message: "Hey, tu contraseña debe contener al menos 6 caracteres."
    });
  }

  next();
};

exports.validateRegister = validateRegister;

const isLoggedIn = async (req, res, next) => {
  try {
    const cookies = new _universalCookie.default(req.headers.cookie);

    if (!cookies.get("auth-token")) {
      return res.status(200).json({
        error: true,
        errorCode: 401,
        data: null,
        msg: `You are not authorized`
      });
    }

    const authorizationToken = cookies.get("auth-token");

    if (!authorizationToken) {
      return res.status(200).json({
        error: true,
        errorCode: 401,
        data: null,
        msg: `You are not authorized`
      });
    }

    const token = _jsonwebtoken.default.verify(authorizationToken, process.env.TOKEN_SECRET);

    const user = await Users.findOne({
      raw: true,
      where: {
        uuid: token.uuid
      }
    });
    req.user = user;
    next(); // continuamos
  } catch (error) {
    return res.status(200).json({
      error: true,
      errorCode: 401,
      data: null,
      msg: error
    });
  }
};

exports.isLoggedIn = isLoggedIn;