"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.send = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _init = _interopRequireDefault(require("../../../models/init.db"));

var _email = _interopRequireDefault(require("../../../services/Email/email.smtp"));

var _mailOptions = _interopRequireDefault(require("../../../services/Email/mailOptions.smtp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = _init.default.models.users;

const send = async (req, res) => {
  if (req.body.email !== undefined) {
    const host = req.get("host");
    const protocol = req.protocol;
    let {
      email
    } = req.body;
    const subject = `Verify your Account`;
    const user = await Users.findOne({
      where: {
        email
      }
    });
    let payload = {
      id: user.id
    };

    if (user.status_id == 2) {
      let secret = `${user.status_id}-${user.createdAt.getTime()}`;

      let token = _jsonwebtoken.default.sign(payload, secret, {
        expiresIn: "300000"
      });

      let message = `${protocol}://${host}/api/verify/${payload.id}/${token}`;
      (0, _email.default)().sendMail(await (0, _mailOptions.default)(email, subject, message), (error, _) => {
        if (error) {
          console.log(`¡SPAM! ${message} ${error}`);
          return res.end("[ERROR]", error);
        }

        return res.end("[ENVIADO]");
      });
    } else {
      res.send({
        message: `[ERROR] El usuario ${user.username} ya se encuentra VERIFICADO`
      });
    }
  } else {
    res.send("[ERROR] INGRESA UN EMAIL VALIDO.");
  }
};

exports.send = send;

const verify = async (req, res) => {
  const {
    id,
    token
  } = req.params;

  if (req.params.id !== undefined) {
    const user = await Users.findByPk(id);
    let secret = `${user.status_id}-${user.createdAt.getTime()}`;

    try {
      _jsonwebtoken.default.verify(token, secret);

      const userUpdate = await Users.update({
        status_id: 1
      }, {
        where: {
          id
        }
      });

      if (userUpdate == 1) {
        res.status(200).send({
          message: `El usuario ${user.username} fue VERIFICADO con EXITO!`
        });
      } else {
        res.status(400).send({
          message: `[ERROR] No se pudo actualizar el usuario ${user.username}`
        });
      }
    } catch (err) {
      res.status(401).send({
        message: "[ERROR] TOKEN o SECRET NO VALIDO"
      });
    }
  } else {
    console.log("[ERROR]");
  }
};

exports.verify = verify;