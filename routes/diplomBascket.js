const Router = require('express');
const router = new Router();
const diplomaController = require('../controler/diplomController');
const authMeadleweare = require('../meadleweare/authMeadleweare');
const metadataMeadlewear = require('../meadleweare/metadataMeddleweare');
const getDataFromMetadata = require('../meadleweare/getMetadataMeadlewear');
const mintDiploma = require('../meadleweare/userDiplomMedleweare');

router.post('/', authMeadleweare, metadataMeadlewear.uploadMetadata, mintDiploma, diplomaController.create);
router.get('/', authMeadleweare, diplomaController.getUserDiploms, getDataFromMetadata);

module.exports = router