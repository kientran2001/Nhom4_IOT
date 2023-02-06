const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {//Role: 1. Người dùng, 2. Admin
        type: Number,
        enum: [1, 2],
        default: 1 
    },
    homes: [{
        type: Schema.Types.ObjectId,
        ref: 'Home'
    }],
},{
    timestamps: true,
});

UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model('User', UserSchema);