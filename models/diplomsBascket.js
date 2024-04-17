const { Schema, model } = require('mongoose');

const DiplomBascket = new Schema({
    userdiplomsid: { type: String, required: true },
    diplomid: { type: String, unique: true, required: true }
})

module.exports = model('DiplomaBasket', DiplomBascket)