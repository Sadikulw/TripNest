const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

// signup form
router.get("/signup", (req, res) => {
    res.render("user/signup");
});
router.post("/signup", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to TripNest " + username);
      res.redirect("/listings");
    });

  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});
module.exports = router;