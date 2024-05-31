const categoryModel = require('../model/category.model')
const productModel = require('../model/product.model')

const getAllProduct = async (req,res) =>{
    const products = await productModel.find()
    res.render('../views/all-product.ejs',{products,title: "Tất cả sản phẩm"})
}
const getOneProduct = async (req,res) =>{
    const product = await productModel.findById(req.params.id).populate('category')
    const category = await categoryModel.find()
    const relatedProducts = await productModel.find({category: product.category}).sort({createdAt: -1}).limit(4)
    res.render('../views/product.ejs',{product,relatedProducts, category, title:product.name})
}

const searchProduct = async (req,res) => {
    const name = req.body.name
    console.log(name)
  try {
    const products = await productModel.find({ name: { $regex: name, $options: 'i' } });
    res.render('../views/searchProduct.ejs',{products, title:"Tìm sản phẩm"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
    getAllProduct,
    getOneProduct,
    searchProduct
}