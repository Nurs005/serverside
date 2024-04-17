const Router = require('express');
const router = new Router();
const dataBase = require('../controler/authController');
const { check } = require('express-validator');
const authMiddleware = require('../meadleweare/authMeadleweare');
const createWallet = require('../meadleweare/createWalletMeadleWear');

router.post('/registration',
    [check('userName', "Имя не должно быть пустым").notEmpty(),
    check('password', "Пороль не должен быть меньше 6 символов").isLength({ min: 6, max: 20 })], createWallet,
    dataBase.registration)
router.post('/login', dataBase.login)
router.get('/', authMiddleware, dataBase.getUser);


module.exports = router;