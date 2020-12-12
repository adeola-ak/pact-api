require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
	try {
		// when the token is sent as a header for authorization
		// authorization: "bearer vnbehvneijr"
		//parse string to get the token
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			const payload = jwt.verify(token, SECRET);
			if (payload) {
				req.payload = payload;
				next();
			} else {
				res.status(400).json({
					error: "VERIFICATION FAILED/ NO PAYLOAD",
				});
			}
		} else {
			res.status(400).json({ error: "NO AUTHORIZATION HEADER" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
};

module.exports = auth;
