const express = require("express")
const userController = require('../controllers/user')
const router = express.Router()

router.get('/login', userController.login);
router.post('/add', userController.addUser);
router.delete('/delete', userController.deleteUserById);
router.put('/modif', userController.modifUserById);

module.exports = router;