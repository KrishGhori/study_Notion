const mongoose = require("mongoose") ;

const CourseSchema = new mongoose.Schema({
    courseName : {
        type : String 
    } ,
    courseDescription : {
        type : String
    } ,
    instructor : {
         type : mongoose.Schema.Types.ObjectId ,
         ref : "User" ,
         required : true
    } ,
    whatYouWillLearn : {
         type : String 
    } ,
    courseContent : [{
         type : mongoose.Schema.Types.ObjectId ,
        ref : "Section"
    }],
    ratingAndReviwes : [{
         type : mongoose.Schema.Types.ObjectId ,
         ref : "RatingAndReview"
    }] ,
    price : {
        type : Number 
    } ,
    thumbnail : {
          type : String ,
    } ,

    tag : {
        type : [String] ,
        require : true
    } ,

    Category : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Category"
    } ,
    studentEnrolled : {
        type : [mongoose.Schema.Types.ObjectId] ,
        default : [] ,
        ref : "User"
    } ,
    status : {
        type : [String] ,
        enum : ["Draft", "Published"]
    } ,
    instruction : {
        type : [String]
    }
}) ;

module.exports = mongoose.model("Course",CourseSchema)