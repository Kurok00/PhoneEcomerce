const express = require('express')
const router = express.Router()
const adminController = require('../../controller/adminController/admin.controller')

// Định tuyến route cho admin 
router.get('/',adminController.getDashboard)

module.exports = router