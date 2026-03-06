const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing");

main()
  .then(() => {
    console.log("Connected to MongoDB");
    return initDB();
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/TripNest");
}

const initDB = async () => {
  await Listing.deleteMany({});

  const updatedData = initdata.data.map((obj) => ({
    ...obj,
    owner: "69a986f456a85cf88b9a288d",
  }));

  await Listing.insertMany(updatedData);

  console.log("Database initialized");
};