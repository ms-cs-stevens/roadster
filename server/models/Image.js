const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

const ImageSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  url: {
    type: String,
    required: true
  }
},
{
  timestamps:  true
});

module.exports = mongoose.model("Image", ImageSchema);