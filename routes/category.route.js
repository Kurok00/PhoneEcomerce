const express = require('express')
const route = express.Router()
const CategoryController = require('../controller/category.controller')

route.get('/',CategoryController.get_Category)

module.exports = route