const CategoryModel = require('../model/category.model')
const ProductModel = require('../model/product.model')

const get_Home = async (req,res)=>{
    try{
        const categories = await CategoryModel.find().sort({createdAt: -1}).limit(3);
        const products = await ProductModel.find().sort({createdAt: -1}).limit(3);
        res.render('../views/homePage.ejs',{categories,products, title:"Trang chủ"})
    }catch(err){
        console.log(err)
    }
}

const get_Collection = async (req,res)=>{
    try{
        const category = await CategoryModel.findById(req.params.id)
        const products = await ProductModel.find({category: req.params.id})
        res.render('../views/collection.ejs',{category,products, title: category.name})
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    get_Home,
    get_Collection
}