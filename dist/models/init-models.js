"use strict";

var DataTypes = require("sequelize").DataTypes;

var _PETS = require("./PETS");

var _ROLES = require("./ROLES");

var _USERS = require("./USERS");

var _USER_PETS = require("./USER_PETS");

var _USER_ROLES = require("./USER_ROLES");

function initModels(sequelize) {
  var PETS = _PETS(sequelize, DataTypes);

  var ROLES = _ROLES(sequelize, DataTypes);

  var USERS = _USERS(sequelize, DataTypes);

  var USER_PETS = _USER_PETS(sequelize, DataTypes);

  var USER_ROLES = _USER_ROLES(sequelize, DataTypes);

  PETS.belongsToMany(USERS, {
    through: USER_PETS,
    foreignKey: "pet_uuid",
    otherKey: "user_uuid"
  });
  ROLES.belongsToMany(USERS, {
    through: USER_ROLES,
    foreignKey: "rol_id",
    otherKey: "user_uuid"
  });
  USERS.belongsToMany(PETS, {
    through: USER_PETS,
    foreignKey: "user_uuid",
    otherKey: "pet_uuid"
  });
  USERS.belongsToMany(ROLES, {
    through: USER_ROLES,
    foreignKey: "user_uuid",
    otherKey: "rol_id"
  });
  USER_PETS.belongsTo(PETS, {
    as: "pet_uu",
    foreignKey: "pet_uuid"
  });
  PETS.hasMany(USER_PETS, {
    as: "USER_PETs",
    foreignKey: "pet_uuid"
  });
  USER_ROLES.belongsTo(ROLES, {
    as: "rol",
    foreignKey: "rol_id"
  });
  ROLES.hasMany(USER_ROLES, {
    as: "USER_ROLEs",
    foreignKey: "rol_id"
  });
  USER_PETS.belongsTo(USERS, {
    as: "user_uu",
    foreignKey: "user_uuid"
  });
  USERS.hasMany(USER_PETS, {
    as: "USER_PETs",
    foreignKey: "user_uuid"
  });
  USER_ROLES.belongsTo(USERS, {
    as: "user_uu",
    foreignKey: "user_uuid"
  });
  USERS.hasMany(USER_ROLES, {
    as: "USER_ROLEs",
    foreignKey: "user_uuid"
  });
  return {
    PETS,
    ROLES,
    USERS,
    USER_PETS,
    USER_ROLES
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;