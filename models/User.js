const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: { type: String, required: true },
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: { type: String, required: true, lowercase: true, trim: true },
		email: { type: String, required: true, lowercase: true, trim: true },
		subscription: { type: String, required: true },
	},
	{ timestamps: true }
);

const User = model("user", UserSchema);

module.exports = User;
