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
// const stripe = require("./controllers/stripe");

//middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); // <-- parse json bodies
app.use(express.static("public"));

//routes
// app.get("/", (req, res) => {
// 	res.json({ status: 200, msg: "hello earth" });
// });

app.get("/", auth, (req, res) => {
	res.json(req.payload);
});

app.use("/auth", AuthRouter);
app.use("/package", PackageRouter); //only access packagerouter when /pachage is before it
// app.use("/stripe-payment", auth, stripe);
// app.use("/subscribe", stripe);

//listener
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}!`);
});
