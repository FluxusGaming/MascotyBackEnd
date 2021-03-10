"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = require("../../controllers/Users/users.controller");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import { isLoggedIn } from "../../middlewares/security.middleware"; */
const router = _express.default.Router();

router.get("/users", _users.findAll);
router.get("/users/find/:id", _users.findOne);
router.post("/users/update", _users.updateUser);
router.post("/users/add/role", _users.addUserRole);
var _default = router;
exports.default = _default;