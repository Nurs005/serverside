const { Web3 } = require('web3');
const { create } = require('../models/User');
const endpont = 'https://eth-sepolia.g.alchemy.com/v2/AIepbTs1NizYh3mlVMsgVXVzIYPMmVPk'
const web3 = new Web3(endpont)


let lastCreationTime = 0;
const creationDelay = 30000;

const createWallet = async (req, res, next) => {
    try {
        const currentTime = Date.now();
        if (currentTime - lastCreationTime < creationDelay) {
            return res.status(400).json('Слишком частое создание кошельков');
        }
        const account = web3.eth.accounts.wallet.create(1);
        req.account = account;
        lastCreationTime = currentTime;

        next();
    } catch (error) {
        console.error('Произошла ошибка при создании кошелька:', error);
        res.status(500).json({ error: 'Ошибка при создании кошелька' });
    }
};

module.exports = createWallet