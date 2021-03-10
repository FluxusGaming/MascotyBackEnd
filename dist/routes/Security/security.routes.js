"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _verifyEmail = require("../../controllers/Security/VerifyAccount/verify.email.controller");

var _forgotPasswordEmail = require("../../controllers/Security/ForgotPassword/forgot.password.email.controller");

var _changePassword = require("../../controllers/Security/ChangePassword/change.password.controller");

var _security = require("../../controllers/Security/security.controller");

var _security2 = require("../../middlewares/security.middleware");

var _whoami = require("../../controllers/Security/whoami.controller");

var _logout = require("../../controllers/Security/logout.controller");

const router = (0, _express.Router)();
router.post("/login", _security.login);
router.post("/changepassword", _security2.isLoggedIn, _changePassword.changepassword);
router.get("/whoami", _security2.isLoggedIn, _whoami.whoami);
router.get("/logout", _security2.isLoggedIn, _logout.logout);
router.post("/register", _security2.validateRegister, _security.register);
router.post("/resetpassword", _forgotPasswordEmail.resetpassword);
router.post("/passwordreset", _forgotPasswordEmail.passwordreset);
router.get("/send", _verifyEmail.send);
router.get("/verify/:id/:token", _verifyEmail.verify);
router.get("/resetpassword/:id/:token", _forgotPasswordEmail.resetpasswordidtoken);
var _default = router;
exports.default = _default;