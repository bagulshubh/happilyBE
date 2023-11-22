const  mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({

   booked:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Session",
    required:true
   },
   bookedby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
   

    
})


module.exports = mongoose.model("Booking",bookingSchema);