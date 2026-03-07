const User=require("../models/user")

module.exports.renderSignup=(req, res) => {
  res.render("user/signup");
}
module.exports.Signup=(req, res, next) => {
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
}

module.exports.renderLogin= (req, res) => {
  res.render("user/login");
}
module.exports.login= async (req, res) => {
    let{username}=req.body;
    req.flash("success","Welcome back to TripNest " + username);
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
  }

module.exports.logout=(req,res,next)=>{
req.logOut((err)=>{
  if(err){
    return next(err)
  }
  req.flash("success","you successfull logout ")
  res.redirect("/listings")
})
}