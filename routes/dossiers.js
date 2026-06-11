const express = require("express")
const dossiersController = require('../controllers/dossiers')
const router = express.Router()


router.get('/', dossiersController.getDossierByPatientId);



module.exports = router;