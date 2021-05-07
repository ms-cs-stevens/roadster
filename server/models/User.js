const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    _id: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "You must provide a firstname"],
    },
    lastName: {
      type: String,
      required: [true, "You must provide a lastname"],
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "You must provide an email"],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "is invalid",
      ],
      index: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
