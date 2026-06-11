const express = require("express")
const medecinsController = require('../controllers/medecins')
const router = express.Router()


router.get('/', medecinsController.getMedecinById);
router.get('/service', medecinsController.getMedecineByServiceId);


module.exports = router;