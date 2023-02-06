const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const DeviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {//1. Cảm biến nhiệt độ, 2. Cảm biến độ ẩm, 3. Thiết bị bật/tắt
        type: Number,
        enum: [1, 2, 3]
    },
    value: {
        type: Number
    },
    state: {
        type: Boolean,
    },
    homeId : {
        type: Schema.Types.ObjectId,
        ref: "Home"
    },
}, {
    timestamps: true,
});

DeviceSchema.plugin(mongoosePaginate);

module.exports = Device = mongoose.model('Device', DeviceSchema);