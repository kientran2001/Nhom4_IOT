const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const HomeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }],
    sensors: [{
        type: Schema.Types.ObjectId,
        ref: 'Sensor'
    }],
}, {
    timestamps: true,
});

HomeSchema.plugin(mongoosePaginate);

module.exports = Home = mongoose.model('Home', HomeSchema);