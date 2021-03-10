const dbConfig = require("../config/db.config");
import initModels from "./init-models";

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,
  options: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
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

db.models = initModels(sequelize);
db.sequelize = sequelize;

module.exports = db;
