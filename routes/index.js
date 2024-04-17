const Router = require('express');
const router = new Router();
const dataRouter = require('./databaseRoutes');
const diplomRouter = require('./diplomBascket');

const upload = require('../multerseting')

router.use(upload)

router.use('/auth', dataRouter);
router.use('/diploma', diplomRouter);

module.exports = router;