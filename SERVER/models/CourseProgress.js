const mongoose = require("mongoose") ;

const courseProgress = mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Course"
    } ,
    CompletedVideos : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "SunSection"
    }]
}) ;

module.exports = mongoose.model("CouseProgress", courseProgress)