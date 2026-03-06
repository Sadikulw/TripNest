const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");

// Index
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  }),
);

// New
router.get("/new", isLoggedin, (req, res) => {
  res.render("listings/new.ejs");
});

// Create
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
  }),
);

// Show
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
   const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "author"
    }
  })
  .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

// Edit
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
  }),
);

// Update
router.put(
  "/:id",
  isLoggedin,
  isOwner,
  validateListing,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id)) {
      req.flash("error", "you dont have permison to edit ");
      return res.redirect("/listings");
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
  }),
);

// Delete
router.delete(
  "/:id",
  isLoggedin,
  isOwner,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
  }),
);

module.exports = router;
