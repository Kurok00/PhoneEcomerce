const productModel = require('../../model/product.model')
const categoryModel = require('../../model/category.model')

const getAddProduct = async (req,res)=>{
    const categories = await categoryModel.find();
    const products = await productModel.find().populate('category')
    res.render('../views/admin/product/addProduct.ejs',{products, categories, title:"Thêm sản phẩm"})
}

const getListProduct = async(req,res) =>{
    const products = await productModel.find().populate('category')
    const category = await categoryModel.find({});
    res.render('../views/admin/product/listProduct.ejs',{products, category, title:"Tất cả sản phẩm"})
}

const postAddProduct = async (req,res) =>{
    const products = await productModel.find().populate('category');
    try {
        const product = new productModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            desc: req.body.desc,    
            count: req.body.count
        });
        await product.save();
        res.redirect('/admin/san-pham/danh-sach');
    } catch (err) {
        res.status(500).send(err);
    }
}

const getEditProduct = async (req,res) =>{
    try{
        const product = await productModel.findById(req.params.id).populate('category')
        const categories = await categoryModel.find({});
        res.render('../views/admin/product/editProduct.ejs',{product,categories, title:"Cập nhật sản phẩm"})
    }catch(err){
        res.status(500).send(err);
    }
}

const putEditProduct = async (req,res)=>{;
    const product = await productModel.findById(req.params.id);
    product.name = req.body.name
    product.category = req.body.category
    product.price = req.body.price
    product.desc = req.body.desc
    product.count = req.body.count
    if (req.file) {
        product.image = req.file.filename;
    }
    await product.save()
    res.redirect('/admin/san-pham/danh-sach');
}

const deleteProduct = async(req,res) =>{
    await productModel.findByIdAndDelete(req.params.id)
    res.redirect('/admin/san-pham/danh-sach');
}
module.exports={
    getAddProduct,
    postAddProduct,
    getListProduct,
    getEditProduct,
    putEditProduct,
    deleteProduct
}