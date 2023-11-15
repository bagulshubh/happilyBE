const User = require("../modules/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();



//signup function
exports.signUp = async(req,res)=>{

    try{

        const  {
            name,
            uid,
            password,
            confirmpassword,
            role
        } = req.body;

        //simple validation
        if(!name || !password  || !confirmpassword || !role || !uid ){
            return res.status(402).json({
                success:false,
                message:"All fileds are required",
            })
        }

        //chceking   passwords
        if(password!==confirmpassword){
            return res.status(402).json({
                success:false,
                message:"Confirm  password  does not   match",
            })
        }

        //does user already exits
        const check1 = await  User.findOne({uid});
        if(check1){
            return res.status(402).json({
                success:false,
                message:"University Id already registerd try to  login",
            })
        }


        const hashedPassword = await bcrypt.hash(password,10);


        const user = await User.create({
            name:name,
            uid:uid,
            password:hashedPassword,
            role:role,
        });

        return res.status(200).json({
            success:true,
            user,
            message:"User created successfully",
        });
    }
    catch(err){
        return  res.status(500).json({
            success:false,
            message:err.message,
        })
    }


}


exports.login = async(req,res)=>{

    try{

        const {uid,password} = req.body;

        if(!uid || !password){
            return res.status(402).json({
                success:false,
                message:"All fileds are reqired",
            })
        }

        const user =  await User.findOne({uid});

        if(!user){
            return res.status(402).json({
                success:false,
                message:"User does not exit",
            })
        }

        //we  can check passwords  directly using  if else and bcrrytp compare  fuction
        if(await bcrypt.compare(password,user.password) ){

            const token = jwt.sign({
                uid:user.uid,id:user._id,role:user.role
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: "24h",
            }
            );

            //check here there may be any parsing  error  with object 
            user.toObject();
            user.token  = token;
            user.password = undefined;
            
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});

        }
        else{
            return res.status(400).json({
                success:"false",
                message:"Password does not match",
            })
        }

    }
    catch(err){
        return  res.status(500).json({
            success:false,
            message:err.message,
        })
    }


}





