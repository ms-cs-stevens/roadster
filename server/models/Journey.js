const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

// Edit or Add as required
const journeySchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  source: {
    type: String,
    required: [true, 'You must provide source'],
  },
  destination: {
    type: String,
    required: [true, 'You must provide destination'],
  },
  budget: {
    type: Number,
    min: 0
  },
  occupancy: {
    type: Number,
    min: 1,
    // required: [true, 'You must provide number people occupying you on journey'],
    default: 1
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date
  },
  creator_id: {
    type: String,
    ref: 'User',
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  },
  modified_by: {
    type: String,
    ref: 'User',
    required: true
  },
  users: [{
    type: String,
    ref: 'User'
  }],
  images: [{
    type: String,
    ref: 'Image'
  }],
  comments: [{
    type: String,
    ref: 'Comment'
  }],
  checkpoints: [{
    type: String,
    ref: 'Checkpoint'
  }]
},
{
  timestamps: true,
});

module.exports = mongoose.model('Journey', journeySchema);
