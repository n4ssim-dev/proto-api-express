const express = require("express")
const patientsController = require('../controllers/patients')
const router = express.Router()


router.get('/', patientsController.getPatientById);
router.get('/all', patientsController.getAllPatients);
router.post('/add', patientsController.addPatient);


module.exports = router;