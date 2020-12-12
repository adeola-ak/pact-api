require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const mongoose = require("./db/connection");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const AuthRouter = require("./controllers/user");
const PackageRouter = require("./controllers/package");
const auth = require("./auth-middleware/index");

//middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); // <-- parse json bodies
app.use(express.static("public"));

//routes
// app.get("/", (req, res) => {
// 	res.send("hello earth");
// });

app.get("/", auth, (req, res) => {
	res.json(req.payload);
});

app.use("/auth", AuthRouter); //only access authrouter when /auth is before it
app.use("/package", PackageRouter);

//listener
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}!`);
});
