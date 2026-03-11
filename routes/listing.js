const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../Controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
   
    upload.single("listing[image]"),
     validateListing,
    wrapAsync(listingController.saveform),
  );

router.get("/new", isLoggedin, listingController.renderform);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.editListing),
);

module.exports = router;
