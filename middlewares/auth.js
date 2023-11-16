
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require('../modules/User');

//main authentication
exports.auth = async (req,res,next)=>{

    try{

        //extracting the token which we  placed in user  at  the  time of login
        const token=  req.body.token || req.header("Authorization").replace("Bearer ", ""); ;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is  missing",
            })
        }

        //verifying the  token
        try{

            const  decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;

        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Tokine is  invalid"
            })
        }
   
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }

}

exports.isDean = async(req,res,next)=>{
    try{

        if(req.user.role!=="dean" && req.user.role!=='Dean'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Dean's only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


exports.isWarden= async(req,res,next)=>{
    try{

        if(req.user.role!=="Warden"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for warden's only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
//cs



