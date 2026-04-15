const Course = require("../models/Course")
const Category = require("../models/Categorys")
const User= require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            })
        }

        const updatePayload = {}

        if (req.body.courseName) updatePayload.courseName = req.body.courseName
        if (req.body.courseDescription) updatePayload.courseDescription = req.body.courseDescription
        if (req.body.price !== undefined) updatePayload.price = req.body.price
        if (req.body.whatYouWillLearn) updatePayload.whatYouWillLearn = req.body.whatYouWillLearn
        if (req.body.status) updatePayload.status = req.body.status

        if (req.body.tag) {
            try {
                updatePayload.tag = typeof req.body.tag === "string"
                    ? JSON.parse(req.body.tag)
                    : req.body.tag
            } catch {
                updatePayload.tag = req.body.tag
            }
        }

        if (req.body.instructions) {
            try {
                updatePayload.instruction = typeof req.body.instructions === "string"
                    ? JSON.parse(req.body.instructions)
                    : req.body.instructions
            } catch {
                updatePayload.instruction = req.body.instructions
            }
        }

        if (req.body.category) {
            updatePayload.Category = req.body.category
        }

        const thumbnail = req.files?.thumbnailImage || req.files?.thumbnail
        if (thumbnail) {
            const uploadedThumbnail = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            updatePayload.thumbnail = uploadedThumbnail.secure_url
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: updatePayload },
            { new: true }
        )
            .populate("Category")
            .populate("ratingAndReviwes")
            .populate({
                path: "courseContent",
                populate: {
                    path: "SubSection",
                },
            })
            .exec()

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message,
        })
    }
}


// createCourse handle function
exports.createCourse = async (req,res) =>{

    try{

        const {courseName , courseDescription, whatYouWillLearn , price , category } = req.body ;

        // get thumbnail
        const thumbnail = req.files?.thumbnailImage || req.files?.thumbnail ;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success : false ,
                message : "please feilds all the Require details"
            })
        }

        if(!thumbnail){
            return res.status(400).json({
                success : false ,
                message : "thumbnail image is required"
            })
        }

        // check instructor
        const userId = req.user.id ;
        const instructorDetails = await User.findById(userId)
        console.log("instructorDetails" ,instructorDetails)

        if(!instructorDetails){
            return res.json({
                success : false ,
                message : "instructorDetails not found"
            })
        }

        const CategoryDetails = await Category.findById(category)

        if(!CategoryDetails){
            return res.json({
                success : false ,
                message : "tag Details not found"
            })
        }

        // upload image to cloudinary 
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME) ;

        const newCourse = await Course.create({
            courseName ,
            courseDescription ,
            instructor : instructorDetails._id ,
            whatYouWillLearn : whatYouWillLearn ,
            price ,
            Category : CategoryDetails._id ,
            thumbnail : thumbnailImage.secure_url
        })

        // add the new course to the use schema of instructor
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id } ,
            {
                $push : {
                    courses : newCourse._id ,

                }
            } ,
            {new : true}
        )

        // upldate the tag schema 
        await Category.findByIdAndUpdate(
            CategoryDetails._id,
        {
            $push: {
            course: newCourse._id
            }
        },
        { new: true }
);
     

        return res.status(200).json({
            success : true ,
            message : "Course created successfully" ,
            data : newCourse    
        })

    } catch(error){

        console.error(error)

        return res.status(500).json({
            success : false ,
            message : "failed to create course" ,
            error : error.message

        })
    }
}


// getAllCourse handler

exports.showAllCourse = async (req,res)=>{
    try{
        
        const  allCourse = await Course.find({})
                                                

        return res.status(200).json({
            success : true ,
            message : "Data for all courses fetched successfully" ,
            data : allCourse
        })

    }catch(error){
        console.error(error)

        return res.status(500).json({
            success : false ,
            message : "Coannot fetch course data" ,
            error : error.message
        })
    }
}

// get course details
exports.getCourseDetails = async (req,res) =>{
    try{
        const courseId = req.body?.courseId || req.query?.courseId ;

        if(!courseId){
            return res.status(400).json({
                success : false ,
                message : "courseId is required"
            })
        }

        const courseDetails = await Course.findById(courseId)
                                                .populate({
                                                    path : "instructor" ,
                                                    populate : {
                                                        path : "additionalDetails"
                                                    }
                                                })
                                                .populate("Category")
                                                .populate("ratingAndReviwes")
                                                .populate({
                                                    path : "courseContent" ,
                                                    populate : {
                                                        path : "subSection"
                                                    }
                                                })
                                                .exec();
        if(!courseDetails){
            return res.status(404).json({
                success : false ,
                message : "could not find the course details"
            })
        }

        return res.status(200).json({
                success : true ,
                message : "course details fetch successfully" ,
                data : courseDetails
            })

    } catch(error){
        return res.status(400).json({
                success : false ,
                error : error.message
            })
    }
}