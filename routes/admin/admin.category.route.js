const express = require('express')
const route = express.Router()
const adCategoryController = require('../../controller/adminController/adminCategory.controller')

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


route.get('/add',adCategoryController.getAddCategory)
route.post('/add',upload.single('image'),adCategoryController.postAddCategory)

route.get('/danh-sach',adCategoryController.viewAllCategory)

route.get('/cap-nhat/:id',adCategoryController.getEditCategory)
route.put('/cap-nhat/:id',upload.single('image'),adCategoryController.putEditCategory)

route.delete('/xoa/:id',adCategoryController.deleteCategory)

route.get('/xnxx/',(req,res)=>{
  
})

module.exports = route