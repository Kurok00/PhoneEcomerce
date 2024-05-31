require('dotenv').config()
const {default: mongoose} = require('mongoose')
mongoose.set('strictQuery',false)

const dbConnect = async ()=>{
    try{
        const conn =  await mongoose.connect(process.env.DB_URL)
        if(conn.connection.readyState == 1){
            console.log('Connect DB success');
        }else{
            console.log('Connect fail');
        }
    }catch(err){
        console.log('DB connect Fail');
        console.log(err);
    }
}

module.exports = dbConnect

