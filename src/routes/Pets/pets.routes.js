import {
  findAll,
  findOne,
  addPet,
} from "../../controllers/Pets/pets.controller";
import express from "express";
/* import { isLoggedIn } from "../../middlewares/security.middleware"; */
const router = express.Router();

router.get("/pets", findAll);
router.get("/pets/find/:id", findOne);
router.post("/pets/add", addPet);

export default router;
