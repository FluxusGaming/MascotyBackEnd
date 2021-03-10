"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _init = _interopRequireDefault(require("./models/init.db"));

var _users = _interopRequireDefault(require("./routes/Users/users.routes"));

var _security = _interopRequireDefault(require("./routes/Security/security.routes"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifySeedData = async () => {
  // Logging apagado para evitar consola.
  _init.default.sequelize.options.logging = false;
  await _init.default.sequelize.sync({
    force: false
  });

  try {
    console.log("Ok"); //   const rolesCount = await db.models.ROLES.count();
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
}; // Ejecutamos la verificación de Data


verifySeedData();

_dotenv.default.config();

const app = (0, _express.default)();
app.use((0, _cors.default)({
  credentials: true,
  origin: ["http://localhost:3000", "https://mascoty.vercel.app"]
}));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _morgan.default)("dev"));
const port = process.env.PORT || 4000;
const prefixApi = "/api";
app.use(prefixApi, _users.default);
app.use(prefixApi, _security.default);
app.get("/", (_, res) => {
  res.status(200).json({
    status: "MascotyAPP BackEnd is Online :D"
  });
}); // app.post("/upload", upload.single("image"), (req, res, next) => {
//   try {
//     const user = req.body.username;
//     return res.status(201).json({
//       message: "Hey, su archivo fue subido exitosamente!",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(port, () => console.log(`MascotyAPP BackEnd is Online on port ${port}`));