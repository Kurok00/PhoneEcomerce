const express = require('express')
const route = express.Router()
const adProductController = require('../../controller/adminController/adminProduct.controller')

const multer = require('multer')
// Cấu hình multer cho việc upload hình ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

route.get('/tao-san-pham',adProductController.getAddProduct)
route.post('/tao-san-pham',upload.single('image'),adProductController.postAddProduct)

route.get('/danh-sach',adProductController.getListProduct)
route.get('/cap-nhat/:id',adProductController.getEditProduct)

module.exports = route