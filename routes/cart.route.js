const express = require('express')
const route = express.Router()
const cartController = require('../controller/cart.controller')

route.get('/', cartController.getCart)
route.post('/them-gio-hang/:id',cartController.addCart)
route.delete('/xoa/:id',cartController.deleteCart)

module.exports = route