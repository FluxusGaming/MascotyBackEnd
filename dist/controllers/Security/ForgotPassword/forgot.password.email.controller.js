"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetpassword = exports.resetpasswordidtoken = exports.passwordreset = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _init = _interopRequireDefault(require("../../../models/init.db"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _email = _interopRequireDefault(require("../../../services/Email/email.smtp"));

var _mailOptions = _interopRequireDefault(require("../../../services/Email/mailOptions.smtp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = _init.default.models.users;

const passwordreset = async (req, res) => {
  if (req.body.email !== undefined) {
    const host = req.get("host");
    const protocol = req.protocol;
    let {
      email
    } = req.body;
    const subject = `Reset your Password`;
    const user = await Users.findOne({
      where: {
        email
      }
    });
    let payload = {
      id: user.id
    };
    let secret = `${user.password}-${user.createdAt.getTime()}`;

    let token = _jsonwebtoken.default.sign(payload, secret, {
      expiresIn: "300000"
    });

    let message = `${protocol}://${host}/api/resetpassword/${payload.id}/${token}`;
    (0, _email.default)().sendMail(await (0, _mailOptions.default)(email, subject, message), (error, _) => {
      if (error) return res.end("[ERROR]", error);
      return res.end("[MENSAJE] ENVIADO");
    });
  } else {
    res.send("[ERROR] INGRESA UN EMAIL VALIDO.");
  }
};

exports.passwordreset = passwordreset;

const resetpasswordidtoken = async (req, res) => {
  const {
    id,
    token
  } = req.params;
  const user = await Users.findByPk(id);
  let secret = `${user.password}-${user.createdAt.getTime()}`;

  let payload = _jsonwebtoken.default.decode(token, secret);

  res.send('<form action="/api/resetpassword" method="POST">' + '<input type="hidden" name="id" value="' + payload.id + '" />' + '<input type="hidden" name="token" value="' + req.params.token + '" />' + '<input type="password" name="password" value="" placeholder="Ingresa tu nueva contraseña..." />' + '<input type="submit" value="Reset Password" />' + "</form>");
};

exports.resetpasswordidtoken = resetpasswordidtoken;

const resetpassword = async (req, res) => {
  const {
    id,
    token,
    password
  } = req.body;
  const user = await Users.findByPk(id);
  let secret = `${user.password}-${user.createdAt.getTime()}`;

  try {
    _jsonwebtoken.default.verify(token, secret);

    const passwordSalt = await _bcryptjs.default.genSalt(10);
    const hash = await _bcryptjs.default.hash(password, passwordSalt);
    const userUpdate = await Users.update({
      password: hash
    }, {
      where: {
        id
      }
    });
    if (userUpdate == 1) return res.status(200).send({
      message: `El usuario ${user.username} fue ACTUALIZADO con EXITO!`
    });else {
      return res.status(400).send({
        message: `[ERROR] No se pudo actualizar el usuario ${user.username}`
      });
    }
  } catch (err) {
    res.status(401).send({
      message: "[ERROR] TOKEN o SECRET NO VALIDO"
    });
  }
};

exports.resetpassword = resetpassword;