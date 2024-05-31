const express = require('express')
const route = express.Router()
const authController = require('../controller/auth.controller')

route.get('/dang-ky',authController.getRegister)
route.post('/dang-ky',authController.postRegister)

route.get('/dang-nhap',authController.getLogin)
route.post('/dang-nhap',authController.postLogin)

module.exports = route