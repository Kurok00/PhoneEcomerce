const CategoryModel = require('../model/category.model')
const ProductModel = require('../model/product.model')

const get_Category = async (req,res)=>{
    try{
        const categories = await CategoryModel.find()
        const products = await ProductModel.find()
        res.render('../views/collection-all.ejs',{categories,products,title: "Tất cả danh mục"})
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    get_Category
}