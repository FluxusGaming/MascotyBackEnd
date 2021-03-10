import db from "../../../models/init.db";
import bcrypt from "bcryptjs";
const Users = db.models.users;
export const changepassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const user = await Users.findByPk(req.user.id);

    const passwordMatch = await bcrypt.compare(old_password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({
        message: `[ERROR] No se pudo actualizar el usuario ${user.username}`,
      });
    }
    const hash = await bcrypt.hash(new_password, 10);

    await Users.update(
      { password: hash },
      {
        where: { id: user.id },
      }
    );
    return res.status(200).send({
      message: `El usuario ${user.username} fue ACTUALIZADO con EXITO!`,
    });
  } catch (error) {
    return res.status(400).send({
      message: `[ERROR] No se pudo actualizar el usuario`,
    });
  }
};
