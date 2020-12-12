require("dotenv").config();
const MONGODBURI = process.env.MONGODBURI;
const mongoose = require("mongoose");
const config = { useNewUrlParser: true, useUnifiedTopology: true };

//connection
mongoose.connect(MONGODBURI, config);

//events to confirm connection

mongoose.connection
	.on("open", () => console.log("NOW: connected to mongo"))
	.on("close", () => console.log("NOW: disconnected from mongo"))
	.on("error", (error) => console.log("NOW: ERROR"));

module.exports = mongoose;
