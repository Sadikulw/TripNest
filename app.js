if(process.env.NODE_ENV!="producation"){
  require('dotenv').config()
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));



const MONGO_URL = process.env.MONGO_URL ;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    
  }
}

connectDB();


const store= MongoStore.create({
    mongoUrl:MONGO_URL,
    crypto:{
      secret: process.env.secret
    },
    touchAfter: 24 * 3600 
})
store.on("error",()=>{
  console.log("ERROR IN MONGO SESSION STORE")
})
const sessionOption = {
  store,
  secret:  process.env.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 72460601000,
    maxAge: 72460601000,
    httpOnly: true
  }
};



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: "username" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser=req.user;
  next();
});


app.use("/", userRoutes);
app.use("/listings/:id/reviews", reviewRoutes); 
app.use("/listings", listingRoutes);            


app.use((req, res, next) => {
  req.flash("error", "Page Not Found");
  res.redirect("/listings");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs",{message})
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});