import db from "../../models/init.db";
import sequelize from "sequelize";
const Users = db.models.USERS;
const UserRol = db.models.USER_ROLES;
const Op = db.Sequelize.Op;
/* Importando bycrypt para la Encriptacion del password*/
import bcrypt from "bcryptjs";
/* Importando JSONWebToken para la generación del Token de Usuario (sesión) */
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({
    raw: true,
    where: sequelize.where(
      sequelize.fn("lower", sequelize.col("username")),
      sequelize.fn("lower", `${username}`)
    ),
  });
  if (!user) {
    return res.status(401).send({
      message: "Usuario y/o contraseña INCORRECTOS",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        uuid: user.uuid,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res
      .status(200)
      .cookie("auth-token", `${token}`, {
        sameSite: "None",
        path: "/",
        httpOnly: true,
        secure: true,
      })
      .json({ message: "Logged in!" });
  }
  return res.status(401).send({
    msg: "[ERROR] Usuario y/o contraseña INCORRECTOS",
  });
};

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    second_name,
    first_lastname,
    second_lastname,
    birth,
    verified_date,
  } = req.body;
  try {
    const users = await Users.findAll({
      raw: true,
      where: {
        [Op.or]: [{ username: `${username}` }, { email: `${email}` }],
      },
    });
    /* Nombre de Usuario no Disponible */
    if (users.length > 0) {
      return res.status(409).send({
        msg: `[ERROR] El nombre de usuario ${username} no se encuentra DISPONIBLE`,
      });
    }
    /* Nombre de Usuario disponible, creandolo... */
    /* Encriptando la contraseña con bcrypt */
    const passwordHash = await bcrypt.hash(password, 10);

    /* Creando el Usuario en la Base de Datos */
    const user = await Users.create({
      uuid: `${uuidv4()}`,
      username: `${username}`,
      email: `${email}`,
      password: `${passwordHash}`,
      first_name: `${first_name}`,
      second_name: `${second_name}`,
      first_lastname: `${first_lastname}`,
      second_lastname: `${second_lastname}`,
      birth: sequelize.fn("NOW"),
      // avatar_url: `${avatar_url}`,
      last_login: sequelize.fn("NOW"),
      verified_date: sequelize.fn("NOW"),
      status: "1",
    });

    await UserRol.create({
      user_uuid: `${user.uuid}`,
      rol_id: 1,
    });

    return res.status(201).send({
      message: `[EXITO] El Usuario ${username} ha sido CREADO`,
    });
  } catch (err) {
    console.log(err);
  }
};
