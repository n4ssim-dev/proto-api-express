const express = require("express")
const appointmentsController = require('../controllers/appointments')
const router = express.Router()

router.get('/date', appointmentsController.getRdvByDate);
router.get('/all', appointmentsController.getAllRdv);
router.post('/', appointmentsController.addRdv);

module.exports = router;