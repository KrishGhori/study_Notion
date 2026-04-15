const mongoose = require("mongoose") ;
require("dotenv").config() ;

exports.connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB canneted successfully") ;
    } catch(error){
        console.error(error)
        console.log("Issue in DB connection")
        process.exit(1)
    }
}