const  mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({

    creater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    time:{
        type:Date,
        required:true,
    },
    booked:{
        type:Boolean,
    },
    bookedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
})


module.exports = mongoose.model("Session",sessionSchema);