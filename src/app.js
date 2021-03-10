/* Creando el Servidor de Express y definiendo las Rutas con Express Router */
import express from "express";

import usersRouter from "./routes/Users/users.routes";
import securityRouter from "./routes/Security/security.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const app = express();

//agregando fileUpload

// middlewares

// routes
const prefixApi = "/api";
app.use(prefixApi, usersRouter);
app.use(prefixApi, securityRouter);

app.use(errors());
//swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.routes.js"],
};

/**
 * @swagger
 * /:
 *   get:
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
app.get("/", (_, res) => {
  res.send(
    `[API] STACKLYAPI FUNCIONANDO CORRECTAMENTE | TIEMPO EN LINEA ${parseInt(
      process.uptime()
    )}segundos [API]`
  );
});

/* Sincronizar los MODELOS DE LA DB*/
import db from "./models/init.db";

const verifySeedData = async () => {
  // Logging apagado para evitar consola.
  db.sequelize.options.logging = false;
  await db.sequelize.sync({ force: false });
  try {
    const statusCount = await db.models.status.count();

    // Verificamos si existen estados cargados
    if (statusCount == 0) {
      // Si no existen añadimos estados y roles.
      db.models.status.create({
        id: 1,
        name: "Activo",
      });

      db.models.status.create({
        id: 2,
        name: "Inactivo",
      });

      db.models.roles.create({
        id: 1,
        name: "user",
        status_id: 1,
      });

      db.models.roles.create({
        id: 2,
        name: "moderador",
        status_id: 1,
      });

      db.models.roles.create({
        id: 3,
        name: "admin",
        status_id: 1,
      });

      db.models.tags.create({
        id: 1,
        name: "HTML",
        status_id: 1,
      });

      db.models.tags.create({
        id: 2,
        name: "CSS",
        status_id: 1,
      });

      console.log("DB sync");
    }
  } catch (err) {
    console.log(err);
  }
};
// Ejecutamos la verificación de Data
verifySeedData();

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
