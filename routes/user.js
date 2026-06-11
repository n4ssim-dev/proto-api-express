const express = require("express")
const userController = require('../controllers/user')
const router = express.Router()


router.get('/login', userController.login);
router.get('/add', userController.addUser);


module.exports = router;