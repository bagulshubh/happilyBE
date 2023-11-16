const express = require('express');
const  app = express();
const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session")
const cookieParser = require("cookie-parser");
const database = require('./configuration/dbconnect');
const  cors = require("cors");


require("dotenv").config();

const PORT = process.env.PORT || 4000;

database.connect();


app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/session", sessionRoutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
//cs
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})













