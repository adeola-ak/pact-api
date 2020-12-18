const { Schema, model } = require("mongoose");

const PackageSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},

		company: {
			type: String,
			required: true,
			trim: true,
		},
		value: { type: String, required: true, trim: true },
		dayPolicy: { type: String, required: true, trim: true },
	},
	{ timestamps: true }
);

const Package = model("package", PackageSchema);

module.exports = Package;
