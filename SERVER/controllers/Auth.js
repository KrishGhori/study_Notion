const User = require("../models/User")
const OTP = require("../models/Otp") 
const otpgenerate = require("otp-generator");
const Profile = require("../models/Profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

// sendotp
exports.sendOTP = async (req,res)=>{
    try{
        const {email} = req.body ;
        const normalizedEmail = email?.trim().toLowerCase();
        console.log("OTP request for email:", normalizedEmail);

        // check user already exist
        const checkEmail = await User.findOne({email: normalizedEmail})

        if(checkEmail){
            console.log("User already exists for email:", normalizedEmail);
            return res.status(401).json({
                success : false ,
                message : "Email already registered. Please login or use a different email."
            })
        }

        // generate OTP
        let otp = otpgenerate.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP Generated :",otp)

        let result = await OTP.findOne({ otp })

        // check unique otp or not  
        while(result){
            otp = otpgenerate.generate(6,{
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false , 
            specialChars : false 
        });
        result = await OTP.findOne({ otp })
        }

        const otpPayload = { email: normalizedEmail , otp }

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload)
        console.log("OTP saved to DB:", otpBody) ;

        res.status(200).json({
            success : true ,
            message : "OTP Sent Successfully" ,
            otp
        })

    } catch(error){
        console.log("error in Send OTP:", error.message)
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Could not send OTP. Please try again."
        })
    }
} 

// signup
exports.signUp = async (req,res)=>{
  try{
    console.log("Signup request body:", req.body);
    
    const {firstname , lastname , email , password ,confirmPassword , accountType , contectNumber , otp} = req.body ;
    const normalizedEmail = email?.trim().toLowerCase();

    console.log("Extracted fields - firstname:", firstname, "lastname:", lastname, "email:", normalizedEmail, "accountType:", accountType);

    // validation
    if(!firstname || !lastname || !normalizedEmail || !password || !confirmPassword || !otp){
        console.log("Validation failed - missing fields");
        return res.status(403).json({
            success : false ,
            message : "All fields are required: firstname, lastname, email, password, confirmPassword, otp"
        })
    }

    // Check if passwords match
    if(password !== confirmPassword){
        return res.status(400).json({
            success : false ,
            message : "Passwords do not match. Please check and try again."
        })
    }

    // Check if user already exists
    const existuser = await User.findOne({ email: normalizedEmail })

    if(existuser){
        return res.status(400).json({
            success : false ,
            message : "Email already registered. Please login instead."
        }) ;
    }

    // find recent otp for the user
    const recentotp = await OTP.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
    
    console.log("email" , normalizedEmail) ;
    console.log("OTP from request:", otp, "Type:", typeof otp);
    console.log("recentotp from DB:", recentotp)

    // Validate OTP
    if(!recentotp){
        console.log("No OTP found for email:", normalizedEmail);
        return  res.status(400).json({
            success : false ,
            message : "OTP expired. Please request a new one."
        }) ;
    }
    
    // Normalize both OTPs to strings for comparison
    const receivedOtp = String(otp || "").trim();
    const storedOtp = String(recentotp.otp || "").trim();
    
    console.log("OTP verification - Received:", receivedOtp, "Stored:", storedOtp);
    console.log("OTP match:", receivedOtp === storedOtp);
    
    if(receivedOtp !== storedOtp) {
        // Invalid OTP
        console.log("OTP mismatch - Expected:", storedOtp, "Got:", receivedOtp);
        return res.status(400).json({
            success : false ,
            message : "Invalid OTP. Please check and try again."
        })
    }
    console.log("OTP verified successfully for email:", normalizedEmail);

    // Hash password
    const hashPassword = await bcrypt.hash(password , 10); 

    // Validate account type
    if(!["Student", "Instructor"].includes(accountType)) {
        console.log("Invalid accountType:", accountType);
        return res.status(400).json({
            success: false,
            message: "Invalid account type selected. Please select Student or Instructor."
        });
    }

    // entery create in db
    const profileDetails = await Profile.create({
        gender : null ,
        dateOfBirth : null ,
        about : null ,
        contectNumber : null ,
    })

    console.log("Creating user with accountType:", accountType);
    const user = await User.create({
        firstname , 
        lastname , 
        email: normalizedEmail , 
        contectNumber ,
        password : hashPassword ,
        additionalDetails : profileDetails._id , 
        accountType ,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}` 
        
    }) ;

    console.log("User created successfully");
    
    // Delete/clear the OTP after successful signup (security best practice)
    try {
        await OTP.deleteMany({ email: normalizedEmail });
        console.log("OTPs cleared from database");
    } catch (err) {
        console.log("Warning: Could not delete OTP:", err.message);
    }
    
    return res.status(200).json({
        success : true ,
        message : "Account created successfully! Please login.",
        user
    })

  } catch(error){
    console.log(" FULL ERROR:");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message  
    });
  }
}

// login
exports.login = async (req,res) =>{
    try{
        const {email , password} = req.body ;
        const normalizedEmail = email?.trim().toLowerCase();

        // Validate data
        if(!normalizedEmail || !password){
            return res.status(403).json({
                success : false ,
                message : "Email and password are required."
            })
        }
        // Check if user exists
        const user = await User.findOne({ email: normalizedEmail }).populate("additionalDetails")
        if(!user){
            return res.status(404).json({
                success : false ,
                message : "User not found. Please sign up first."
            })
        }

        // compare password
        if(await bcrypt.compare(password , user.password)){
            const payload = {
                email : user.email ,
                id : user._id ,
                accountType : user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h" 
            })
        
            user.token = token ;
            user.password = undefined ;
            const option = {
                expires : new Date(Date.now() + 3*24*60*60*1000) ,
                httpOnly : true 
            }
            res.cookie("token" , token , option ).status(200).json({
                success : true ,
                token ,
                user ,
                message : "Login successful!"
            })

        }
        else {
            return res.status(401).json({
                success : false ,
                message  : "Password is incorrect. Please try again."
            })
        }
    } catch(error){
        console.log("issue in login")
        console.error(error)

        return res.status(500).json({
            success : false ,
            message : "Login failed. Please try again."
        })
    }
}

// changepass password 

exports.changePassword = async (req,res) => {
    try {
        const {oldPassword , newPassword , confirmPassword  } = req.body ;

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(403).json({
                success : false ,
                message : "please fill the all Deatails"
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success : false ,
                message : "New password and confirm password do not match"
            })
        }

        const userId = req.user.id;
        const user = await User.findById(userId);

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success : false ,
                message : "Password does not match"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

         await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        try {
            await mailSender(
                updatedUser.email,
                "Password Updated",
                "Your password has been changed successfully."
            );
        } catch (emailError) {
            console.warn("⚠️ Password changed but email notification failed:", emailError.message);
            // Continue - password was updated successfully
        }

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while changing password"
    });
    }
}