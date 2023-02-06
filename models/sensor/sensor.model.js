const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const SensorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number
    },
    homeId : {
        type: Schema.Types.ObjectId,
        ref: "Home"
    },
}, {
    timestamps: true,
});

SensorSchema.plugin(mongoosePaginate);

module.exports = Sensor = mongoose.model('Sensor', SensorSchema);