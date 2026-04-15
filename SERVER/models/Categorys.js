const mongoose = require("mongoose") ;

const categorysSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    description : {
         type : String
    } ,
    course : {
        type : [mongoose.Schema.Types.ObjectId] ,
        ref : "Course",
        default : []
    }
}) ;

module.exports = mongoose.model("Category",categorysSchema)