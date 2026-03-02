const mongoose = require('mongoose');
const initdata = require('./data');
const Listing = require('../models/listing');

main()
  .then(() => {
    console.log('Connected to MongoDB');
    return initDB();
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log('Database initialized');
};

initDB();