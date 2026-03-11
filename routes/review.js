const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const {validateReview, isLoggedin, isReviewOwner}=require("../middleware")
const reviewController=require("../Controller/review")
// Add review
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.addReview)
);

// Delete review
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewOwner,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;