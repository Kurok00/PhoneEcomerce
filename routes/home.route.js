const express = require('express')
const route = express.Router()
const homeController = require('../controller/home.controller')

route.get('/',homeController.get_Home)
route.get('/danh-muc/:id',homeController.get_Collection)

module.exports = route