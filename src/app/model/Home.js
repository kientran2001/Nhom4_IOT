const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const Device = require('../model/Device');

const Schema = mongoose.Schema;

const Home = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    devices: {
      type: String,
      required: true,
    }
  }
);

// Add plugins
mongoose.plugin(slug)

module.exports = mongoose.model("Home", Home);
