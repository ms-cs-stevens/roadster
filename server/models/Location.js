const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");

const locationSchema = new Schema({
  _id: {
    type: String,
    default: nanoid(),
  },
  locality: String,
  state: String,
  country: String,
  address: String,
  postcode: String,
  place_id: String,
  lat: Number,
  lng: Number,
});

module.exports = locationSchema;
