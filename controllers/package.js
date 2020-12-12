// const User = require("../models/user");
const Package = require("../models/package");
const auth = require("../auth-middleware/index"); // to prevent accessing of routes without auth
const { Router } = require("express");
const router = Router();

//index
router.get("/", auth, async (req, res) => {
	try {
		const { username } = req.payload;
		res.status(200).json(await Package.find({ username }));
	} catch (error) {
		res.status(400).json({ error });
	}
});

//create
router.post("/", auth, async (req, res) => {
	try {
		const { username } = req.payload;
		req.body.username = username;
		res.status(200).json(await Package.create(req.body));
	} catch (error) {
		res.status(400).json({ error });
	}
});

//update
router.put("/:id", auth, async (req, res) => {
	try {
		const { username } = req.payload;
		req.body.username = username;
		const { id } = req.params;
		res.status(200).json(
			await Package.findByIdAndUpdate(id, req.body, { new: true })
		);
	} catch (error) {
		res.status(400).json({ error });
	}
});

//delete
router.delete("/:id", auth, async (req, res) => {
	try {
		const { id } = req.params;
		res.status(200).json(await Package.findByIdAndDelete(id));
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router; // to send out the route
