const productModel = require('../../model/product.model')
const categoryModel = require('../../model/category.model')

const getAddProduct = async (req,res)=>{
    const categories = await categoryModel.find();
    res.render('../views/admin/product/addProduct.ejs',{categories})
}

const getListProduct = async(req,res) =>{
    const products = await productModel.find().populate('category');
    res.render('../views/admin/product/listProduct.ejs',{products})
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
        res.render('../views/admin/product/listProduct.ejs',{products});
    } catch (err) {
        res.status(500).send(err);
    }
}

const getEditProduct = async (req,res) =>{
    try{
        const product = await productModel.findById(req.params.id).populate('category')
        const categories = await categoryModel.find({});
        res.render('../views/admin/product/editProduct.ejs',{product,categories})
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports={
    getAddProduct,
    postAddProduct,
    getListProduct,
    getEditProduct
}