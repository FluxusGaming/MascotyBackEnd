"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _init = _interopRequireDefault(require("../../models/init.db"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = _init.default.models.USERS;
const UserRol = _init.default.models.USER_ROLES;
const Op = _init.default.Sequelize.Op;
/* Importando bycrypt para la Encriptacion del password*/

const login = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  const user = await Users.findOne({
    raw: true,
    where: _sequelize.default.where(_sequelize.default.fn("lower", _sequelize.default.col("username")), _sequelize.default.fn("lower", `${username}`))
  });

  if (!user) {
    return res.status(401).send({
      message: "Usuario y/o contraseña INCORRECTOS"
    });
  }

  const passwordMatch = await _bcryptjs.default.compare(password, user.password);

  if (passwordMatch) {
    const token = _jsonwebtoken.default.sign({
      uuid: user.uuid
    }, process.env.TOKEN_SECRET, {
      expiresIn: "7d"
    });

    return res.status(200).cookie("auth-token", `${token}`, {
      sameSite: "strict",
      path: "/",
      httpOnly: true,
      secure: false
    }).json({
      message: "Logged in!"
    });
  }

  return res.status(401).send({
    msg: "[ERROR] Usuario y/o contraseña INCORRECTOS"
  });
};

exports.login = login;

const register = async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    second_name,
    first_lastname,
    second_lastname,
    birth,
    verified_date
  } = req.body;

  try {
    const users = await Users.findAll({
      raw: true,
      where: {
        [Op.or]: [{
          username: `${username}`
        }, {
          email: `${email}`
        }]
      }
    });
    /* Nombre de Usuario no Disponible */

    if (users.length > 0) {
      return res.status(409).send({
        msg: `[ERROR] El nombre de usuario ${username} no se encuentra DISPONIBLE`
      });
    }
    /* Nombre de Usuario disponible, creandolo... */

    /* Encriptando la contraseña con bcrypt */


    const passwordHash = await _bcryptjs.default.hash(password, 10);
    /* Creando el Usuario en la Base de Datos */

    const user = await Users.create({
      uuid: `${(0, _uuid.v4)()}`,
      username: `${username}`,
      email: `${email}`,
      password: `${passwordHash}`,
      first_name: `${first_name}`,
      second_name: `${second_name}`,
      first_lastname: `${first_lastname}`,
      second_lastname: `${second_lastname}`,
      birth: _sequelize.default.fn("NOW"),
      // avatar_url: `${avatar_url}`,
      last_login: _sequelize.default.fn("NOW"),
      verified_date: _sequelize.default.fn("NOW"),
      status: "1"
    });
    await UserRol.create({
      user_uuid: `${user.uuid}`,
      rol_id: 1
    });
    return res.status(201).send({
      message: `[EXITO] El Usuario ${username} ha sido CREADO`
    });
  } catch (err) {
    console.log(err);
  }
};

exports.register = register;