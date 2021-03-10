"use strict";

var _db = _interopRequireDefault(require("../config/db.config"));

var _initModels = _interopRequireDefault(require("./init-models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Sequelize = require("sequelize");

const sequelize = new Sequelize(_db.default.DB, _db.default.USER, _db.default.PASSWORD, {
  host: _db.default.HOST,
  dialect: _db.default.dialect,
  //operatorsAliases: false,
  options: 0,
  pool: {
    max: _db.default.pool.max,
    min: _db.default.pool.min,
    acquire: _db.default.pool.acquire,
    idle: _db.default.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("[DB] Connection has been established successfully.");
  } catch (error) {
    console.error("[DB] Unable to connect to the database:", error);
  }
};

testConnection();
db.models = (0, _initModels.default)(sequelize);
db.sequelize = sequelize;
module.exports = db;