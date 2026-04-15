const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../models/User")

// auth 
exports.auth = async (req,res , next )=>{
    try{
        const authHeader = req.header("Authorization") || req.header("Authorisation")
        const token = req.cookies?.token 
                            || req.body?.token  
                            || (authHeader ? authHeader.replace("Bearer ", "").trim() : null) ; 

        if(!token){
            return res.status(401).json({
                success : false ,
                message : "token is missing"
            })
        }

        // verify token
        try {
            const decode = await jwt.verify(token ,process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        } catch(error){
            return res.status(401).json({
                success : false ,
                message : "token is invalid"
            })
        }

        next() ;

    } catch(error){
        return res.status(401).json({
                success : false ,
                message : "somthing went worng while validating the token"
            })
    }
}

// student 
exports.isStudent = async (req,res ,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Student only"
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
                success : false ,
                message : "User role cannot be varify , please try again"
            })
    }
}

//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Instructor only"
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
                success : false ,
                message : "User role cannot be varify , please try again"
            })
    }
}


//isAdmin
exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Admin only"
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
                success : false ,
                message : "User role cannot be varify , please try again"
            })
    }
}