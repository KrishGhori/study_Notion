const Profile = require("../models/Profile")
const User = require("../models/User")
const Course = require("../models/Course")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.updateProfile = async (req,res) =>{
    try{

    const {dateOfBirth="" , about="" , contectNumber , gender} = req.body ;

    const id = req.user.id ;

    if(!contectNumber || !gender || !id ){
            return res.json({
                success : false ,
                message : "please feilds all the Require details"
            })
        }
    const userDetails = await User.findById(id);
    
    if(!userDetails){
        return res.json({
            success : false ,
            message : "user not found"
        })
    }
    
    const profileTd = userDetails.additionalDetails ;
    
    if(!profileTd){
        return res.json({
            success : false ,
            message : "profile details not found"
        })
    }
    
    const profileDetails = await Profile.findById(profileTd)
    
    if(!profileDetails){
        return res.json({
            success : false ,
            message : "profile not found in database"
        })
    }

    // update profile 
    profileDetails.dateOfBirth = dateOfBirth ;
    profileDetails.about = about ;
    profileDetails.gender = gender ;
    profileDetails.contectNumber = contectNumber
    await profileDetails.save()

    return res.json({
        success : true ,
        messsage : "profile details update successfully" ,
        profileDetails
    })
        
    } catch(error){
        return res.status(500).json({
      success: false,
      error: error.message,
    });
    }
}


exports.deleteAccount = async (req,res) =>{
    try{
        const id = req.user.id

        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.json({
                success : false ,
                message : "user not found"
            })
        }
        // unenroll user from all enrolled courses
        const enrolledCourses = userDetails.courses;

        for (const courseId of enrolledCourses) {
            await Course.findByIdAndUpdate(courseId, {
            $pull: { studentEnrolled: id },
            });
        }

        // delete user
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails}) ;

        await User.findByIdAndDelete({_id:id})

        return res.json({
        success : true ,
        messsage : "user deleted successfully" ,
        
    })
    }catch(error){
         return res.status(500).json({
        success: false,
        error: error.message,
        });
    }
}

// get all userDetails
exports.getAllUserDetails = async (req,res) => {
    try{
        const id = req.user.id ;

    const userDetails = await User.findById(id)
      .select("-password")
      .populate("additionalDetails")
      .exec();

        return res.json({
            success : true ,
            messsage : "User data fetched successfully" ,
            userDetails
        })

    }catch(error){
        return res.status(500).json({
        success: false,
        error: error.message,
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const displayPicture = req.files.displayPicture;

    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Display picture is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Upload to cloudinary
    const image = await uploadImageToCloudinary(displayPicture, "profile", 200, 100);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    )
      .select("-password")
      .populate("additionalDetails")
      .exec();

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating display picture",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("courses")
      .exec();

    res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      data: user.courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enrolled courses",
      error: error.message,
    });
  }
};