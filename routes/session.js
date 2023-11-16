const  express = require("express");
const router = express.Router();


const {createSession,createBooking,getAllSessions,getUserBooking}  = require('../controller/Session')

const {auth,isDean,isWarden} = require("../middlewares/auth")

//route for login
router.post("/createSession",auth,isDean,createSession);

router.post("/createBooking",auth,isWarden,createBooking);

router.get("/getAllSessions",auth,isWarden,getAllSessions);

router.get("/getBooking",auth,isDean,getUserBooking);

module.exports = router
//s
