const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstname: {
      type: String,
      required: [true, 'You must provide a firstname'],
    },
    lastname: {
      type: String,
      required: [true, 'You must provide a lastname'],
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          // validates to true for "+11234567890", false for any other format or number of characters
          return /[+1]\d{3}\d{3}\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required'],
      unique: true
    },
    firebaseId: {
      type: String,
      required: [true, 'Firebase ID required'],
    },
    profilePicture: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'You must provide an email'],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'is invalid',
      ],
      index: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
