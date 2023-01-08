const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const Device = new Schema(
  {
    userId: {
        type: String,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug)

module.exports = mongoose.model("Device", Device);
