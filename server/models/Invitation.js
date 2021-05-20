const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");

const invitationSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    journeyId: {
      type: String,
      required: [true, "You must provide a journey"],
    },
    userId: {
      type: String,
      required: [true, "You must provide an user"],
    },
    acceptorId: {
      type: String,
      required: [true, "You must provide an acceptor"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invitation", invitationSchema);
