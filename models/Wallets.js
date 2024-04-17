const { Schema, model } = require('mongoose');


const UserWallet = new Schema({
    publicKey: { type: String, unique: true, required: true },
    privateKey: { type: String, unique: true, required: true },
    userid: { type: String, unique: true, required: true },
});

module.exports = model('wallet', UserWallet);
