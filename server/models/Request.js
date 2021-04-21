const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

const requestSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    note: {
      type: String,
      required: 'You must supply a description',
    },
    status: {
      type: String,
      enum: ['approved', 'rejected'],
    },
    journeyId: {
      type: String,
      required: [true, 'You must provide a journey'],
    },
    userId: {
      type: String,
      required: [true, 'You must provide an user'],
    },
    initiatorId: {
      type: String,
      required: [true, 'You must provide an initiator'],
    },
  },
  { timestamps: true, }
);

module.exports = mongoose.model('User', requestSchema);
