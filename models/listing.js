const express = require('express');
const mongoose = require('mongoose');
const Review = require("./review");
const { types } = require('joi');


const listingSchema = new mongoose.Schema({
    title: {
        type: String,   
        required: true
    },
    description: {      
        type: String,
        
    },
    image: {
  type: String,
  default: "https://images.unsplash.com/photo-1770106678115-ec9aa241cdf6",
  set: (v) => v === "" ? undefined : v
},

    price: {    
        type: Number,   
    },
    location: {
        type: String,   
    
    },
    country : {
        type: String,  

    },
reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }
],
owner:{
   type:mongoose.Schema.Types.ObjectId,
        ref:"User"
}
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
  }
});
const Listing = mongoose.model('Listing', listingSchema);   
module.exports = Listing;