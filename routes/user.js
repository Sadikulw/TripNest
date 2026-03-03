const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

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

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (req, res) => {
    let{username}=req.body;
    req.flash("success","Welcome back to TripNest " + username);
    res.redirect("/listings")
  },
);

module.exports = router;
