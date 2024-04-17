const { Schema, model } = require('mongoose');

const Diploma = new Schema({
    metadata: { type: String, unique: true, required: true },
})

module.exports = model('Diploma', Diploma)