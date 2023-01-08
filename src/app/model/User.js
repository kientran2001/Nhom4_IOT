const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    homeId: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model("User", User);
