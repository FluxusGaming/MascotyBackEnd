"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserRole = exports.updateUser = exports.findOne = exports.findAll = void 0;

const db = require("../../models/init.db");

const sequelize = require("sequelize");

const Users = db.models.users;
const UserRol = db.models.user_rol;
const Rol = db.models.roles;
const Op = db.Sequelize.Op;

const findAll = async (_, res) => {
  try {
    const user = await Users.findAll();
    return res.send(user);
  } catch (error) {
    return res.status(500).send({
      message: "[ERROR] Se produjo un error al recuperar usuarios."
    });
  }
};

exports.findAll = findAll;

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (!user) return res.status(500).send({
      message: `[ERROR] No se pudo encontrar un Usuario con ID = ${id}`
    });
    return res.send(user);
  } catch (error) {
    return res.status(500).send({
      message: `[ERROR] No se pudo encontrar el Usuario`
    });
  }
};

exports.findOne = findOne;

const updateUser = async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      username,
      email
    } = req.body;
    const user = await Users.update({
      first_name,
      last_name,
      username,
      email
    }, {
      where: {
        id
      }
    });
    if (user == 1) res.status(200).send({
      message: `El usuario ${username} fue ACTUALIZADO con EXITO!`
    });else {
      res.status(400).send({
        message: `[ERROR] No se pudo actualizar el usuario con ID = ${id}`
      });
    }
  } catch (error) {}
};

exports.updateUser = updateUser;

const addUserRole = async (req, res) => {
  try {
    let {
      id,
      roles
    } = req.body;
    if (!id || !roles) return res.send({
      message: "[ERROR] Faltan Argumentos"
    });
    const user = await Users.findByPk(id);

    if (!user) {
      return res.send({
        message: "[ERROR] El Usuario no EXISTE"
      });
    }

    const userRoles = await UserRol.findAll({
      raw: true,
      where: {
        users_id: id
      }
    });
    let whitelist = await Rol.findAll({
      raw: true
    });
    whitelist = whitelist.map(r => r.id);
    roles = [...new Set(roles)];
    const userRoleIds = userRoles.map(r => r.roles_id);
    let cleanRoles = roles.reduce((acc, cv, ci, array) => {
      if (userRoleIds.includes(cv) || !whitelist.includes(cv)) {
        return acc;
      }

      return [...acc, cv];
    }, []);

    if (cleanRoles.length == 0) {
      return res.status(400).json({
        message: `[ERROR] No fueron asignados roles al usuario.`
      });
    }

    cleanRoles.forEach(rol => {
      UserRol.create({
        roles_id: `${rol}`,
        users_id: `${user.id}`
      });
    });
    return res.status(201).json({
      message: `[EXITO] Fueron asignados ${cleanRoles.length} roles al usuario ${user.username}.`
    });
  } catch (error) {
    res.status(400).json({
      message: `[ERROR] ${error}`
    });
  }
};

exports.addUserRole = addUserRole;