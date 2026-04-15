const Section = require("../models/Section")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

exports.createSubSection = async (req,res) => {
    try{

    const {sectionId , title , timeDuration , descryption, description} = req.body ;  
    const finalDescription = description || descryption
    const finalDuration = timeDuration || "0:00"
    
    // extract file / video
    const video = req.files?.videoFile || req.files?.video ;

    if(!sectionId || !title || !finalDescription || !video){
        return res.status(400).json({
            success : false ,
            message : "all proertise are require"
        })
    }

    // upldoad video to cloudinary
    const uploadDetals = await uploadImageToCloudinary(video , process.env.FOLDER_NAME)

    const subSectionDetails = await SubSection.create({
        title : title ,
        timeDuration : finalDuration ,
        descryption : finalDescription ,
        video : uploadDetals.secure_url 
    })

    // update section with this subsection objectId 
    const updatedSection = await Section.findByIdAndUpdate({_id : sectionId} ,
                                                            {
                                                                $push : {
                                                                    SubSection : subSectionDetails._id
                                                                }
                                                            } ,
                                                            { new : true}
                                                        )
                                                        .populate("SubSection")
   
                                                        

    return res.status(200).json({
        success : true ,
        message : "SubSection created successfully" ,
        updatedSection,
        data: updatedSection
    })



    }catch(error){
        return res.status(500).json({
            success : false ,
            error : error.message ,
            message : "error while creating SubSection"
        })
    }
}


// update Subsection

exports.updateSubSection = async (req,res) => {
    try{
        const {subSectionId , title , timeDuration , descryption, description} = req.body

        if(!subSectionId){
            return res.status(400).json({
                success : false ,
                message : "subSectionId is required"
            })
        }

        const existingSubSection = await SubSection.findById(subSectionId)

        if(!existingSubSection){
            return res.status(404).json({
                success : false ,
                message : "SubSecton not found"
            })
        }

        const nextTitle = title || existingSubSection.title
        const nextDescription = description || descryption || existingSubSection.descryption
        const nextDuration = timeDuration || existingSubSection.timeDuration || "0:00"
        
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId ,
                                                                    {
                                                                        title: nextTitle ,
                                                                        descryption: nextDescription ,
                                                                        timeDuration: nextDuration
                                                                    } ,
                                                                    {new : true}
                                                                )

        // check if new video uploaded
        const video = req.files?.videoFile || req.files?.video;
        if (video) {
        

            // upload to cloudinary
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );

        // update video URL
        updatedSubSection.video = uploadDetails.secure_url;

        await updatedSubSection.save();
    }
        return res.status(200).json({
            success : true ,
            message  : "subsection updated successfullyzc" ,
            updatedSubSection,
            data: updatedSubSection
        })


    } catch(error){
        return res.status(500).json({
        success: false,
        message: "Error while updating SubSection",
        error: error.message,
    });
    }
}



// delete SubSection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId and sectionId are required",
      });
    }

    // delete subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // remove subsection from section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: {
                SubSection: subSectionId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting SubSection",
      error: error.message,
    });
  }
};