const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");
const locationSchema = require("./Location");

// Edit or Add as required
const journeySchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    origin: locationSchema,
    destination: locationSchema,
    budget: {
      type: Number,
      min: 0,
    },
    occupancy: {
      type: Number,
      min: 1,
      // required: [true, 'You must provide number people occupying you on journey'],
      default: 1,
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
    },
    creator_id: {
      type: String,
      ref: "User",
      required: true,
    },
    editable: {
      type: Boolean,
    },
    modified_by: {
      type: String,
      ref: "User",
      required: true,
    },
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
    images: [
      {
        type: String,
        ref: "Image",
      },
    ],
    comments: [
      {
        type: String,
        ref: "Comment",
      },
    ],
    checkpoints: [
      {
        type: String,
        ref: "Checkpoint",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Journey", journeySchema);
