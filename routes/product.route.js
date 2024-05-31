const express = require('express')
const route = express.Router()
const ProductController = require('../controller/product.controller')
route.get('/',ProductController.getAllProduct)
route.get('/san-pham/:id',ProductController.getOneProduct)

route.post('/tim-kiem',ProductController.searchProduct)

module.exports = route