const mongoose = require("mongoose") ;

const subSectionSchema = new mongoose.Schema({
    title : {
        type : String 
    } ,
    timeDuration : {
        type : String
    } ,
    descryption : {
        type : String ,
    } ,
    video : {
        type : String
    }
}) ;

module.exports = mongoose.model("SubSection", subSectionSchema)