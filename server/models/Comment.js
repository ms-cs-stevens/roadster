const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

const CommentSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  content: {
    type: String,
    required: true
  }
},
{
  timestamps:  true
});

module.exports = mongoose.model("Comment", CommentSchema);