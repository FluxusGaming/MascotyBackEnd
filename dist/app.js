"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./routes/Users/users.routes"));

var _security = _interopRequireDefault(require("./routes/Security/security.routes"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _init = _interopRequireDefault(require("./models/init.db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Creando el Servidor de Express y definiendo las Rutas con Express Router */
const app = (0, _express.default)(); //agregando fileUpload
// middlewares
// routes

const prefixApi = "/api";
app.use(prefixApi, _users.default);
app.use(prefixApi, _security.default);
app.use(errors()); //swagger

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description: "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html"
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com"
    }
  },
  servers: [{
    url: "http://localhost:4000",
    description: "Development server"
  }]
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.routes.js"]
};
/**
 * @swagger
 * /:
 *   get:
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

app.get("/", (_, res) => {
  res.send(`[API] STACKLYAPI FUNCIONANDO CORRECTAMENTE | TIEMPO EN LINEA ${parseInt(process.uptime())}segundos [API]`);
});
/* Sincronizar los MODELOS DE LA DB*/

const verifySeedData = async () => {
  // Logging apagado para evitar consola.
  _init.default.sequelize.options.logging = false;
  await _init.default.sequelize.sync({
    force: false
  });

  try {
    const statusCount = await _init.default.models.status.count(); // Verificamos si existen estados cargados

    if (statusCount == 0) {
      // Si no existen añadimos estados y roles.
      _init.default.models.status.create({
        id: 1,
        name: "Activo"
      });

      _init.default.models.status.create({
        id: 2,
        name: "Inactivo"
      });

      _init.default.models.roles.create({
        id: 1,
        name: "user",
        status_id: 1
      });

      _init.default.models.roles.create({
        id: 2,
        name: "moderador",
        status_id: 1
      });

      _init.default.models.roles.create({
        id: 3,
        name: "admin",
        status_id: 1
      });

      _init.default.models.tags.create({
        id: 1,
        name: "HTML",
        status_id: 1
      });

      _init.default.models.tags.create({
        id: 2,
        name: "CSS",
        status_id: 1
      });

      console.log("DB sync");
    }
  } catch (err) {
    console.log(err);
  }
}; // Ejecutamos la verificación de Data


verifySeedData();
const specs = (0, _swaggerJsdoc.default)(options);
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));
var _default = app;
exports.default = _default;