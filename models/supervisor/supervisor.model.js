const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const SupervisorSchema = new Schema({
    homeId: {
        type: Schema.Types.ObjectId,
    },
    temperature: {
        type: Number,
    },
    humidity : {
        type: Number
    }
}, {
    timestamps: true,
});

SupervisorSchema.plugin(mongoosePaginate);

module.exports = Supervisor = mongoose.model('Supervisor', SupervisorSchema);