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
    name: {
      type: String,
      required: true,
    },
    origin: locationSchema,
    destination: locationSchema,
    description: {
      type: String,
    },
    budget: {
      type: Number,
      min: 0,
    },
    occupancy: {
      type: Number,
      min: 1,
      default: 1,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    // endDate: {
    //   type: Date,
    // },
    creatorId: {
      type: String,
      ref: "User",
      required: true,
    },
    editable: {
      type: Boolean,
    },
    modifiedBy: {
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
    checkpoints: [
      {
        type: locationSchema,
      },
    ],
    comments: [
      {
        _id: {
          type: String,
          default: () => nanoid(),
        },
        posterId: {
          type: String,
          default: nanoid(),
        },
        content: String,
      },
      { timestamps: true },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Journey", journeySchema);
