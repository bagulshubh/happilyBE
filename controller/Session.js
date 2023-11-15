const User = require("../modules/User");
const Session = require("../modules/Session");
const Booking = require("../modules/Booking")

exports.createSession = async(req,res) =>{

    try{

        const {time} = req.body;
        const id = req.user.id;

        const response = await Session.create({
            creater:id,
            time:time,
            booked:false,
        })

        return res.status(200).json({
            success:"True",
            message:"Session Created Successfully",
            response:response,
        })


    }
    catch(err){
        return res.status(500).json({
            success:"False",
            message:err.message,
            location:"Session controller(create)"
        })
    }

}

exports.createBooking  = async(req,res) =>{

    try{

        const {booked} = req.body;

        const id = req.user.id;

        const session = await Session.findByIdAndUpdate(booked,{
            booked:true,
        })

        const booking = await Booking.create({
            booked:booked,
            bookedby:id,
        })

        const user = await User.findByIdAndUpdate(id,{
            $put:{
                bookings:booking._id,
            }
        })

        return res.status(200).json({
            success:"True",
            message:"Session Booked",
            booking,
            user
        })

    }
    catch(err){
        return res.status(500).json({
            success:"False",
            message:err.message,
            location:"Createbooking controller"
        })
    }

}

exports.getAllSessions = async(req,res)=>{
    try{

        const sessions = await Session.find({booked:false});

        return res.status(200).json({
            success:"True",
            message:"All Sessions fetched",
            sessions
        })

    }
    catch(err){
        return res.status(500).json({
            success:"False",
            message:err.message,
            location:"getAllSessions controller"
        })
    }
}

exports.getUserBooking = async(req,res)=>{
    try{

        const id = req.user.id;

        const sessions = await Session.find({booked:true , creater:id , time:{
            $gte:Date.now()
        } });

        return res.status(200).json({
            success:"True",
            message:"Sessions fetched",
            sessions,
        })

    }
    catch(err){
        return res.status(500).json({
            success:"False",
            message:err.message,
            location:"GetuserBooking Controller"
        })
    }
}
