import jwt from "jsonwebtoken";
import db from "../../../models/init.db";
import smtpTransport from "../../../services/Email/email.smtp";
import mailOption from "../../../services/Email/mailOptions.smtp";
const Users = db.models.users;
export const send = async (req, res) => {
  if (req.body.email !== undefined) {
    const host = req.get("host");
    const protocol = req.protocol;
    let { email } = req.body;
    const subject = `Verify your Account`;

    const user = await Users.findOne({ where: { email } });
    let payload = {
      id: user.id,
    };

    if (user.status_id == 2) {
      let secret = `${user.status_id}-${user.createdAt.getTime()}`;
      let token = jwt.sign(payload, secret, { expiresIn: "300000" });
      let message = `${protocol}://${host}/api/verify/${payload.id}/${token}`;

      smtpTransport().sendMail(await mailOption(email, subject, message), (error, _) => {
        if (error) {
          console.log(`¡SPAM! ${message} ${error}`);
          return res.end("[ERROR]", error);
        }

        return res.end("[ENVIADO]");
      });
    } else {
      res.send({ message: `[ERROR] El usuario ${user.username} ya se encuentra VERIFICADO` });
    }
  } else {
    res.send("[ERROR] INGRESA UN EMAIL VALIDO.");
  }
};

export const verify = async (req, res) => {
  const { id, token } = req.params;
  if (req.params.id !== undefined) {
    const user = await Users.findByPk(id);
    let secret = `${user.status_id}-${user.createdAt.getTime()}`;
    try {
      jwt.verify(token, secret);

      const userUpdate = await Users.update(
        { status_id: 1 },
        {
          where: { id },
        }
      );
      if (userUpdate == 1) {
        res.status(200).send({
          message: `El usuario ${user.username} fue VERIFICADO con EXITO!`,
        });
      } else {
        res.status(400).send({
          message: `[ERROR] No se pudo actualizar el usuario ${user.username}`,
        });
      }
    } catch (err) {
      res.status(401).send({ message: "[ERROR] TOKEN o SECRET NO VALIDO" });
    }
  } else {
    console.log("[ERROR]");
  }
};
