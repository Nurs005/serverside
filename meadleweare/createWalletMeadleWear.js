const { Web3 } = require('web3');
const { create } = require('../models/User');
const endpont = 'https://sepolia.rpc.rivet.cloud/0b4acccaf0ce4abb85b7ca5c0fec61e1'
const web3 = new Web3(endpont)

const createWallet = async (req, res, next) => {
    const account = web3.eth.accounts.wallet.create(1)
    req.account = account
    next()
}

module.exports = createWallet