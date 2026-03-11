const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controller/user.js");

router
  .route("/signup")
  .get(userController.renderSignup)
  .post(userController.Signup);

router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );
router.get("/logout", userController.logout);
module.exports = router;
