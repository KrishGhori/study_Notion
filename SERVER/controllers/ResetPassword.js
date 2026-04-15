const User = require("../models/User")
const mailsender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

exports.resetPasswordToken = async (req,res)=>{
   try {
     // get email from req.body
    const {email} = req.body ;

    if(!email){
        return res.status(400).json({
            success : false,
            message : "email is required"
        })
    }

    // check user for this email , email validation
    const user = await User.findOne({email : email}) ;

    if(!user){
        return res.json({
            success : false ,
            message : "your email is not registered whith us" 
        })
    }

    // generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiretime
    const UpdateDetails = await User.findOneAndUpdate(
                                                {email : email} , 
                                                {
                                                    token : token ,
                                                    resetPasswordExpires : Date.now() + 5*60*1000 ,
                                                } ,
                                                {
                                                    new : true
                                                }
                                            )

    //create url
    const url = `https://localhost:3000/update-password/${token}`

    // send mail containg the url
    try {
        await mailsender(
            email ,
            "Password reset Like" ,
            `Password reset Like : ${url}`
        )
        return res.json({
            success : true ,
            messsage : "Email send successfully , please open email & change the password"
        })
    } catch (emailError) {
        console.warn("⚠️ Reset token generated but email failed:", emailError.message);
        // Still return success - token was created and user can still use password reset link
        return res.json({
            success : true ,
            messsage : "Reset token generated. Email may have failed - try checking spam or request again."
        })
    }
   } catch(error){
    
    console.error(error)
    return res.json({
        success : false ,
        messsage : "somthing went wrong while sending pwd mail"
    })
   }   
}

// resetPassword
exports.resertPassword = async (req,res)=>{
try{
        const {password , confirmPassword , token} = req.body

    if(password !== confirmPassword){
        return res.json({
            success : false ,
            message : "password not match"
        })
    }

    const userDetails = await User.findOne({token : token})

    if(!userDetails){
        return res.json({
            success : false ,
            message : "token is invalid"
        })
    }

    // token time check
    if(userDetails.resetPasswordExpires < Date.now() ){
        return res.json({
            success : false ,
            message : "token is expired , please regenerate your token"
        })
    }

    // hash password 
    const hashPassword = await bcrypt.hash(password , 10)

    await User.findOneAndUpdate({token : token } , {password : hashPassword} , {new : true})

    return res.json({
        success : true ,
        message : "password reset successfully"
    })

}catch(error){
    console.error(error)
    return res.json({
        success : false ,
        message : "somthing went wrong , please try again"
    })
}
}