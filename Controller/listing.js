const { model } = require("mongoose");
const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey=process.env.MAP_API

 module.exports.index = async (req, res, next) => {
  const { category, search, filters } = req.query;

  let filter = {};
  let sortOption = {};

  // Category filter
  if (category) {
    filter.category = category;
  }

  // Search filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } }
    ];
  }

  // Price Sorting
  if (filters === "low-to-High") {
    sortOption = { price: 1 };
  } 
  else if (filters === "high-to-low") {
    sortOption = { price: -1 };
  }

  try {

    const listings = await Listing.find(filter).sort(sortOption);

    res.render("listings/index.ejs", { 
      listings,
      category,
      search,
      filters
    });

  } catch (err) {
    next(err);
  }
};

module.exports.renderform = (req, res) => {
  res.render("listings/new.ejs");
};

 module.exports.saveform = async (req, res, next) => {
  // res.send(req.path)
  let url = req.file.path;
  let filename = req.file.filename;

  // Geocode location
  const geoData = await maptilerClient.geocoding.forward(
    req.body.listing.location,
    { limit: 1 }
  );

  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Save coordinates
  newListing.geometry = geoData.features[0].geometry;

  await newListing.save();
 

  req.flash("success", "New listing created");
  res.redirect("/listings",);
};

module.exports.showListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing, mapToken: process.env.MAP_API });
};

module.exports.editListing = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
let originalUrl = listing.image.url;

originalUrl = originalUrl.replace("/upload", "/upload/h_200");

res.render("listings/edit.ejs", { listing, originalUrl });
}
module.exports.updateListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "you dont have permison to edit ");
    return res.redirect("/listings");
  }
  let listings = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !=="undefined"){
let url = req.file.path;
  let filename = req.file.filename;
  listings.image = { url, filename };
  await listings.save();
  }
  
  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res, next) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};
