const getDashboard = (req,res)=>{
    res.render('../views/admin/dashboard.ejs',{title: "Trang quản trị"})
}

module.exports = {
getDashboard
}