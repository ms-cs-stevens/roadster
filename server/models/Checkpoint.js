const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

// Add more fields as required
const CheckpointSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  }
},
{
  timestamps:  true
});

module.exports = mongoose.model("Checkpoint", CheckpointSchema);