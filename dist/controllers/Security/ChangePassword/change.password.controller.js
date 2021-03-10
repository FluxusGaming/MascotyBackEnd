"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changepassword = void 0;

var _init = _interopRequireDefault(require("../../../models/init.db"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = _init.default.models.users;

const changepassword = async (req, res) => {
  try {
    const {
      old_password,
      new_password
    } = req.body;
    const user = await Users.findByPk(req.user.id);
    const passwordMatch = await _bcryptjs.default.compare(old_password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({
        message: `[ERROR] No se pudo actualizar el usuario ${user.username}`
      });
    }

    const hash = await _bcryptjs.default.hash(new_password, 10);
    await Users.update({
      password: hash
    }, {
      where: {
        id: user.id
      }
    });
    return res.status(200).send({
      message: `El usuario ${user.username} fue ACTUALIZADO con EXITO!`
    });
  } catch (error) {
    return res.status(400).send({
      message: `[ERROR] No se pudo actualizar el usuario`
    });
  }
};

exports.changepassword = changepassword;