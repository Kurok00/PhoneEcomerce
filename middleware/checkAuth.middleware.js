const checkAuth = (req,res,next) => {
    if(req.session.userId){
        return next()
    }else{
        res.render('../views/login.ejs')
    }
}   

const checkAdmin = (req,res,next)=>{
    if(req.session.userRole === 'admin'){
        return next()
    }else{
        res.render('../views/login.ejs')
    }
}

module.exports = {
    checkAdmin,
    checkAuth
}