const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const { viewAllCategory } = require('./adminController/adminCategory.controller')

const getRegister = (req,res)=>{
    res.render('../views/register.ejs')
}

const getLogin = (req,res) =>{
    res.render('../views/login.ejs')
}
const postRegister = async (req,res)=>{
    try{
        const {email, name, password} = req.body
        const exitstingUserName = await userModel.findOne({name})
        const exitstingUserEmail = await userModel.findOne({email})
        if(exitstingUserName || exitstingUserEmail){
            console.log('Tài khoản không hợp lệ ');
            return res.render('../views/register.ejs',{message: 'Tên hoặc email đã có người sử dụng'})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new userModel({email,name,password: hashPassword})
        await newUser.save()
        res.redirect('/dang-nhap')
    }catch(err){
        console.log(err);
    }
}   

const postLogin = async (req,res)=>{
    const {email, password} = req.body
    const userFind = await userModel.findOne({email})
    const userPassword = await bcrypt.compareSync(password, userFind.password)
    if(userFind && userPassword){
        req.session.userId = userFind._id
        req.session.userRole = userFind.role
        return res.render('../views/homePage.ejs')
    }else{
        res.render('../views/login.ejs',{message: 'Tài khoản mật khẩu không chính xác'})
        console.log(message);
    }
}


module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin
}