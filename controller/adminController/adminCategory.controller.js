const categoryModel = require('../../model/category.model')

const getAddCategory = (req,res) =>{
    res.render('../views/admin/category/addCategory.ejs',{title:"Thêm danh mục"})
}

const postAddCategory = async (req,res) =>{
    const name = req.body.name
    const image = req.file ? req.file.filename : '';
    const newCategory = new categoryModel({ name, image });
    await newCategory.save();
    res.redirect('/admin/danh-muc/add');
}

const viewAllCategory = async (req, res) =>{
    const categories = await categoryModel.find();
    res.render('../views/admin/category/viewCategory.ejs', { categories,title:"Tất cả danh mục" });
}

const getEditCategory = async (req,res)=>{
    const categories = await categoryModel.findById(req.params.id);
    res.render('../views/admin/category/editCategory.ejs',{categories,title:"Cập nhật danh mục"})
}

const putEditCategory =  async (req,res) =>{
    const { name } = req.body
    const image = req.file ? req.file.filename : req.body.currentImage
    await categoryModel.findByIdAndUpdate(req.params.id, { name, image })
    res.redirect('/admin/danh-muc/danh-sach')
}

const deleteCategory = async (req,res) =>{
    await categoryModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin/danh-muc/danh-sach');
}
module.exports = {
    getAddCategory,
    postAddCategory,
    viewAllCategory,
    getEditCategory,
    putEditCategory,
    deleteCategory
}