const productModel = require('../model/product.model')
const cartModel = require('../model/cart.model')
const getCart = async(req,res) =>{
    const cart = await cartModel.findOne().populate('products.productId');
    res.render('../views/cart.ejs',{cart,title: 'Giỏ hàng'})
}

const addCart = async (req,res) =>{
    const productId = await productModel.findById(req.params.id)
    let cart = await cartModel.findOne()
    
    if(!cart){
        cart = new cartModel({products:[]})
    }
    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId)
    if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    
    await cart.save()
    res.redirect('/gio-hang')
}
const deleteCart = async (req,res) =>{
    await cartModel.findByIdAndDelete(req.params.id);
    res.redirect('/gio-hang')
  }
module.exports = {
    getCart,
    addCart,
    deleteCart
}