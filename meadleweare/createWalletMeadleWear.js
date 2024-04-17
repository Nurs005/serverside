const { Web3 } = require('web3');
const { create } = require('../models/User');
const endpont = 'https://eth-mainnet.g.alchemy.com/v2/nsy1wVdd1DkxbDrnnC26FfzKhWmI4Lhn'
const web3 = new Web3(endpont)

const createWallet = async (req, res, next) => {
    const account = web3.eth.accounts.wallet.create(1)
    req.account = account
    next()
}

module.exports = createWallet