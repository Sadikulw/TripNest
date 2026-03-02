const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", (req, res, next) => {
  const { email, username, password } = req.body;

  const newUser = new User({ email, username });

  User.register(newUser, password)
    .then((registeredUser) => {
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to TripNest " + username);
        res.redirect("/listings");
      });
    })
    .catch((err) => {
      req.flash("error", err.message);
      res.redirect("/signup");
    });
});

module.exports = router;