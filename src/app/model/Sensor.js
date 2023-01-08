const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Sensor = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
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
// Sensor.plugin(mongooseDelete, { 
//   deletedAt: true,
//   overrideMethods: 'all',
// });

module.exports = mongoose.model("Sensor", Sensor);
