import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import db from "./models/init.db";
import usersRoutes from "./routes/Users/users.routes";
import petsRoutes from "./routes/Pets/pets.routes";
import securityRoutes from "./routes/Security/security.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const verifySeedData = async () => {
  // Logging apagado para evitar consola.
  db.sequelize.options.logging = false;
  await db.sequelize.sync({ force: false });
  try {
    console.log("Ok");
    //   const rolesCount = await db.models.ROLES.count();

    //   // Verificamos si existen estados cargados
    //   if (rolesCount == 0) {
    //     // Si no existen añadimos estados y roles.
    //     db.models.ROLES.create({
    //       id: 1,
    //       name: "USER",
    //       permissions: "1",
    //       status_id: 1,
    //     });

    //     db.models.ROLES.create({
    //       id: 2,
    //       name: "MOD",
    //       permissions: "2",
    //       status_id: 1,
    //     });

    //     db.models.ROLES.create({
    //       id: 3,
    //       name: "ADMIN",
    //       permissions: "3",
    //       status_id: 1,
    //     });

    //     console.log("DB sync");
    //   }
  } catch (err) {
    console.log(err);
  }
};
// Ejecutamos la verificación de Data
verifySeedData();
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://mascoty.vercel.app"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
const port = process.env.PORT || 4000;

const prefixApi = "/api";
app.use(prefixApi, usersRoutes);
app.use(prefixApi, securityRoutes);
app.use(prefixApi, petsRoutes);

app.get("/", (_, res) => {
  res.status(200).json({ status: "MascotyAPP BackEnd is Online :D" });
});

// app.post("/upload", upload.single("image"), (req, res, next) => {
//   try {
//     const user = req.body.username;
//     return res.status(201).json({
//       message: "Hey, su archivo fue subido exitosamente!",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(port, () =>
  console.log(`MascotyAPP BackEnd is Online on port ${port}`)
);
