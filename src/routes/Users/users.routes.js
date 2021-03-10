import { findAll, findOne, updateUser, addUserRole } from "../../controllers/Users/users.controller";
import express from "express";
/* import { isLoggedIn } from "../../middlewares/security.middleware"; */
const router = express.Router();

router.get("/users", findAll);
router.get("/users/find/:id", findOne);
router.post("/users/update", updateUser);
router.post("/users/add/role", addUserRole);

export default router;
