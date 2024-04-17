const { Schema, model } = require('mongoose');

const UserDiploms = new Schema({
    userid: { type: String, unique: true, required: true },
})

module.exports = model('UserBascket', UserDiploms)