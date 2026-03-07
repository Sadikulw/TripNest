const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../Controller/listing.js");
// Index
router.get("/", wrapAsync(listingController.index));

// New
router.get("/new", isLoggedin, listingController.renderform);

// Create
router.post("/", validateListing, wrapAsync(listingController.saveform));

// Show
router.get("/:id", wrapAsync(listingController.showListing));

// Edit
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.editListing),
);

// Update
router.put(
  "/:id",
  isLoggedin,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

// Delete
router.delete(
  "/:id",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.destroyListing),
);

module.exports = router;
