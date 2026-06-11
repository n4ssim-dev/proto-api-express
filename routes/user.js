const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3")
const router = express.Router()
const userController = require("../controllers/user")

router.get('/login', userController.login)

module.exports = router