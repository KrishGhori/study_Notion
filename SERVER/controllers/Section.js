const Section = require("../models/Section")
const Course = require("../models/Course")

exports.createSection = async (req,res) =>{
    try {

        // data fetch
        const {sectionName , courseId } = req.body ;

        // data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success : false ,
                message : " missing properties "
            })
        }

        // create  section
        const newSection = await Section.create({sectionName, SubSection: []})

        // update course with section objecId 
        const updateCourseDetails = await Course.findByIdAndUpdate( courseId , { $push : 
                                                                            {
                                                                            courseContent : newSection._id 
                                                                        } 
                                                                        
                                                                    } ,
                                                                    { new: true  }
                                                                    )
                                                                    .populate({
                                                                        path: "courseContent",
                                                                        populate: {
                                                                            path: "SubSection"
                                                                        }
                                                                    })

    return res.status(200).json({
        success : true ,
        message : "section created successfully",
        updatedCourse: updateCourseDetails
    })

    } catch(error){
       console.error(error)
        return res.status(500).json({
            success : false ,
            message : "enable to create section" ,
            error : error.message
    }) 
    }

}


exports.updateSection = async (req,res)=>{
    try{

        const {sectionName , sectionId, courseId} = req.body ;

        if(!sectionId || !sectionName ){
            return res.status(400).json({
                success :  false ,
                message : "missing properties"
            })
        }

                await Section.findByIdAndUpdate(sectionId , 
                                                                {sectionName} , 
                                                                {new : true}
                                                            )

                const updatedCourse = await Course.findById(courseId)
                                                                                    .populate({
                                                                                        path: "courseContent",
                                                                                        populate: {
                                                                                            path: "SubSection",
                                                                                        },
                                                                                    })

                return res.status(200).json({
            success : true ,
                        message : "section updated successfully",
                        data: updatedCourse
        })

    } catch(error){
         console.error(error)
        return res.status(500).json({
            success : false ,
            message : "enable to Update the Section" ,
            error : error.message
    }) 
    }
}


exports.deleteSection = async (req,res) => {
    try{

        const {sectionId, courseId} = req.body ;

        if(!sectionId){
            return res.status(400).json({
                success : false ,
                message : "require all properties"
            })
        }

                await Course.findByIdAndUpdate(courseId, {
                        $pull: {
                                courseContent: sectionId,
                        },
                })

                await Section.findByIdAndDelete(sectionId)

                const updatedCourse = await Course.findById(courseId)
                                                                                    .populate({
                                                                                        path: "courseContent",
                                                                                        populate: {
                                                                                            path: "SubSection",
                                                                                        },
                                                                                    })

                return res.status(200).json({
            success : true ,
                        message : "section delete successfully",
                        data: updatedCourse
        })

    } catch(error){

          console.error(error)
        return res.status(500).json({
            success : false ,
            message : "enable to DELETE the Section" ,
            error : error.message
    }) 
    }
}