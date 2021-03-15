var DataTypes = require("sequelize").DataTypes;
var _PETS = require("./PETS");
var _PETS_IMG = require("./PETS_IMG");
var _ROLES = require("./ROLES");
var _USERS = require("./USERS");
var _USER_ROLES = require("./USER_ROLES");

function initModels(sequelize) {
  var PETS = _PETS(sequelize, DataTypes);
  var PETS_IMG = _PETS_IMG(sequelize, DataTypes);
  var ROLES = _ROLES(sequelize, DataTypes);
  var USERS = _USERS(sequelize, DataTypes);
  var USER_ROLES = _USER_ROLES(sequelize, DataTypes);

  ROLES.belongsToMany(USERS, { through: USER_ROLES, foreignKey: "rol_id", otherKey: "user_uuid" });
  USERS.belongsToMany(ROLES, { through: USER_ROLES, foreignKey: "user_uuid", otherKey: "rol_id" });
  PETS_IMG.belongsTo(PETS, { as: "pet_uu", foreignKey: "pet_uuid"});
  PETS.hasMany(PETS_IMG, { as: "PETS_IMGs", foreignKey: "pet_uuid"});
  USER_ROLES.belongsTo(ROLES, { as: "rol", foreignKey: "rol_id"});
  ROLES.hasMany(USER_ROLES, { as: "USER_ROLEs", foreignKey: "rol_id"});
  PETS.belongsTo(USERS, { as: "user_uu", foreignKey: "user_uuid"});
  USERS.hasMany(PETS, { as: "PETs", foreignKey: "user_uuid"});
  PETS_IMG.belongsTo(USERS, { as: "user_uu", foreignKey: "user_uuid"});
  USERS.hasMany(PETS_IMG, { as: "PETS_IMGs", foreignKey: "user_uuid"});
  USER_ROLES.belongsTo(USERS, { as: "user_uu", foreignKey: "user_uuid"});
  USERS.hasMany(USER_ROLES, { as: "USER_ROLEs", foreignKey: "user_uuid"});

  return {
    PETS,
    PETS_IMG,
    ROLES,
    USERS,
    USER_ROLES,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
