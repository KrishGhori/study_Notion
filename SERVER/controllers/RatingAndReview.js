const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating
exports.createrating = async (req,res) => {
    try{

        const {userId} = req.body   ;

        const {rating , review , courseId } = req.body ;

        // check if user enrolled or not 
        const courseDetails = await Course.findOne( 
                                                    {_id:courseId ,
                                                        studentEnrolled: {$elemMatch:{$eq : userId}}
                                                    } 
                                                )
        if(!courseDetails){
            return res.status(404).json({
                success : false ,
                message : "user is not enrolled in this course" ,
                error : error.message
            })
        }
        // check if user already reviewed in the course
        const alreadyReview = await RatingAndReview.findOne({user:userId,
                                                            course:courseId
                                                        })  ;
        if(alreadyReview){
            return res.status(403).json({
                success : false ,
                message : "user is allready reviewed by the user" ,
                error : error.message
                
            })
        }

        const ratingReview = await RatingAndReview.create({
                                                        rating , review ,
                                                        course : courseId ,
                                                        user : userId
                                                    });  
        // update in the course
        await Course.findByIdAndUpdate({_id:courseId}, 
                                        {
                                            $push : {
                                                ratingAndReviwes:ratingReview
                                            }
                                        }, {new : true})

        return res.status(200).json({
            success : true ,
            message : "Rating And Review successfully created" ,
            ratingReview
        })


    } catch(error){
        return res.status(500).json({
            success : false ,
            error : error.message
        })
    }
} 


// get average Rating
exports.getAverageRating = async (req,res)=>{
    try{

        // get courseId 
        const {courseId} = req.body

        // calculate the average rating 
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId)
                }
            } ,
            {
                $group : {
                    _id : null ,
                    averageRating : { $avg : "$rating" }
                }   
            }
        ])

        //return rating 
        if(result.length >0){
            return res.status(200).json({
            success : true ,
            averageRating : result[0].averageRating
        })
        }

        // if no rating/review exist  
        return res.status(200).json({
            success : true ,
            message : "average Rating is 0 , no rating given till now ",
            averageRating : 0 
        })

    }

    catch(error){
    return res.status(500).json({
            success : false ,
            error : error.message
        })
    }
} 


// get all rating 
exports.getAllRating = async (req,res) => {
    try{

        const allReview = await RatingAndReview.find({})
                                               .sort({rating : "desc"})
                                               .populate({
                                                 path : "user" ,
                                                 select : "firstName lastName email image"
                                               })
                                               .populate({
                                                 path : "course" ,
                                                 select :"courseName"
                                               })
                                               .exec()

            return res.status(200).json({
                success : true ,
                                message : "All review fetch successfully" ,
                                data : allReview
            })                                   

    } catch(error){
        return res.status(500).json({
            success : false ,
            error : error.message
        })
    }
}

// get reviews for homepage
exports.getReviews = async (req,res) => {
    try {
        const reviews = await RatingAndReview.find({})
            .sort({ rating: -1 })
            .populate({
                path: "user",
                select: "firstName lastName image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .limit(8)
            .exec()

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}