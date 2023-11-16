const  mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    uid:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    bookings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
    }]
    
})//cs


module.exports = mongoose.model("User",userSchema);