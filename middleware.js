const Listing = require("./models/listing")
const Review = require("./models/review")
const ExpressError = require("./utils/expressError");
const { listingSchema,reviewsSchema } = require("./schema.js");
const review = require("./models/review");

module.exports.isLoggedin =(req,res,next)=>{
    if  (!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
    req.flash("error","you must be logged in");
    return res.redirect("/login");
  }
  next()
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
      let { id } = req.params;
    let listing=await Listing.findById(id)
    if(!listing.owner.equals( res.locals.currentUser._id)){
      req.flash("error","you dont have permission ")
      return res.redirect(`/listings/${_id}`)
    }
    next()
}
module.exports. validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewsSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};

module.exports.isReviewOwner=async(req,res,next)=>{
      let { id,reviewId } = req.params;
    let review=await Review.findById(reviewId)
    if(!review.author.equals( res.locals.currentUser._id)){
      req.flash("error","you dont have permission to delete this review")
      return res.redirect(`/listings/${id}`)
    }
    next()
}