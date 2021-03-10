import { Router } from "express";
import {
  send,
  verify,
} from "../../controllers/Security/VerifyAccount/verify.email.controller";
import {
  passwordreset,
  resetpasswordidtoken,
  resetpassword,
} from "../../controllers/Security/ForgotPassword/forgot.password.email.controller";
import { changepassword } from "../../controllers/Security/ChangePassword/change.password.controller";
import {
  register,
  login,
} from "../../controllers/Security/security.controller";
import {
  isLoggedIn,
  validateRegister,
} from "../../middlewares/security.middleware";
import { whoami } from "../../controllers/Security/whoami.controller";
import { logout } from "../../controllers/Security/logout.controller";

const router = Router();

router.post("/login", login);
router.post("/changepassword", isLoggedIn, changepassword);
router.get("/whoami", isLoggedIn, whoami);
router.get("/logout", isLoggedIn, logout);
router.post("/register", validateRegister, register);
router.post("/resetpassword", resetpassword);
router.post("/passwordreset", passwordreset);
router.get("/send", send);
router.get("/verify/:id/:token", verify);
router.get("/resetpassword/:id/:token", resetpasswordidtoken);

export default router;
