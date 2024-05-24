const express = require('express')
const app = express()
const connectDB = require('./config/db.config')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

// Setting middleware
app.use(express.static('public'))   
app.use(express.json({urlencoded: true}))


// Setting method override and body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// DB connect
connectDB()
const port = process.env.PORT || 9000

// Set Template
app.set('view engine', 'ejs')

// Session
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
  }))

// Set Router
const homeRouter = require('./routes/home.route')
const authRoute = require('./routes/auth.route')
const adminRoute = require('./routes/admin/admin.route')
const adminCategoryRoute = require('./routes/admin/admin.category.route')
const adminProductRoute = require('./routes/admin/admin.product.route')
const { Mongoose, default: mongoose } = require('mongoose')
const {checkAdmin,checkAuth}   = require('./middleware/checkAuth.middleware')
// Using Route
app.use('/', homeRouter)

// admin Route
app.use('/admin',checkAuth, checkAdmin,adminRoute)
app.use('/admin/danh-muc',checkAuth, checkAdmin,adminCategoryRoute)
app.use('/admin/san-pham',checkAuth, checkAdmin,adminProductRoute)
app.use(authRoute)

app.listen(port,(req,res)=>{
    try{
        console.log(`Connect Successfull http://localhost:${port}`);
    }catch(err){
        console.log(err);
    }
})