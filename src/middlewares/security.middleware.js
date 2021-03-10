import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";
import db from "../models/init.db";
const Users = db.models.USERS;

export const validateRegister = (req, res, next) => {
  /* Nombre de usuario - minimo 3 letras */
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).send({
      message: "Hey, tu usuario debe contener al menos 3 caracteres.",
    });
  }
  /* Contraseña con 6 caracteres mínimo*/
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      message: "Hey, tu contraseña debe contener al menos 6 caracteres.",
    });
  }
  next();
};

export const isLoggedIn = async (req, res, next) => {
  try {
    const cookies = new Cookies(req.headers.cookie);
    if (!cookies.get("auth-token")) {
      return res.status(200).json({
        error: true,
        errorCode: 401,
        data: null,
        msg: `You are not authorized`,
      });
    }
    const authorizationToken = cookies.get("auth-token");
    if (!authorizationToken) {
      return res.status(200).json({
        error: true,
        errorCode: 401,
        data: null,
        msg: `You are not authorized`,
      });
    }

    const token = jwt.verify(authorizationToken, process.env.TOKEN_SECRET);
    const user = await Users.findOne({
      raw: true,
      where: {
        uuid: token.uuid,
      },
    });
    req.user = user;
    next(); // continuamos
  } catch (error) {
    return res.status(200).json({
      error: true,
      errorCode: 401,
      data: null,
      msg: error,
    });
  }
};
