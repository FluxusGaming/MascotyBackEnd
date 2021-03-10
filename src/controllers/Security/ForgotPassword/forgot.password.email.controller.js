import jwt from "jsonwebtoken";
import db from "../../../models/init.db";
import bcrypt from "bcryptjs";
import smtpTransport from "../../../services/Email/email.smtp";
import mailOption from "../../../services/Email/mailOptions.smtp";
const Users = db.models.users;

export const passwordreset = async (req, res) => {
  if (req.body.email !== undefined) {
    const host = req.get("host");
    const protocol = req.protocol;
    let { email } = req.body;
    const subject = `Reset your Password`;

    const user = await Users.findOne({ where: { email } });
    let payload = {
      id: user.id,
    };

    let secret = `${user.password}-${user.createdAt.getTime()}`;
    let token = jwt.sign(payload, secret, { expiresIn: "300000" });
    let message = `${protocol}://${host}/api/resetpassword/${payload.id}/${token}`;

    smtpTransport().sendMail(await mailOption(email, subject, message), (error, _) => {
      if (error) return res.end("[ERROR]", error);
      return res.end("[MENSAJE] ENVIADO");
    });
  } else {
    res.send("[ERROR] INGRESA UN EMAIL VALIDO.");
  }
};

export const resetpasswordidtoken = async (req, res) => {
  const { id, token } = req.params;
  const user = await Users.findByPk(id);

  let secret = `${user.password}-${user.createdAt.getTime()}`;
  let payload = jwt.decode(token, secret);

  res.send(
    '<form action="/api/resetpassword" method="POST">' +
      '<input type="hidden" name="id" value="' +
      payload.id +
      '" />' +
      '<input type="hidden" name="token" value="' +
      req.params.token +
      '" />' +
      '<input type="password" name="password" value="" placeholder="Ingresa tu nueva contraseña..." />' +
      '<input type="submit" value="Reset Password" />' +
      "</form>"
  );
};

export const resetpassword = async (req, res) => {
  const { id, token, password } = req.body;
  const user = await Users.findByPk(id);
  let secret = `${user.password}-${user.createdAt.getTime()}`;
  try {
    jwt.verify(token, secret);
    const passwordSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, passwordSalt);
    const userUpdate = await Users.update(
      { password: hash },
      {
        where: { id },
      }
    );
    if (userUpdate == 1)
      return res.status(200).send({
        message: `El usuario ${user.username} fue ACTUALIZADO con EXITO!`,
      });
    else {
      return res.status(400).send({
        message: `[ERROR] No se pudo actualizar el usuario ${user.username}`,
      });
    }
  } catch (err) {
    res.status(401).send({ message: "[ERROR] TOKEN o SECRET NO VALIDO" });
  }
};
