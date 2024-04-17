const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const meadleweare = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
        return
    }

    try {
        const token = req.headers.authorization
        if (token) {
            const tokenParse = token.split(' ')[1]
            const decodeData = jwt.verify(tokenParse, secret)
            req.user = decodeData.id
            next()
            return
        }
        return res.status(404).json({ message: "Пользователь не найден " })
    } catch (error) {
        return res.status(403).json(error.message)
    }
}

module.exports = meadleweare