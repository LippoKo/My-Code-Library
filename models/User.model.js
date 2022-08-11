const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			//match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
		},
		password: {
			type: String,
			required: true,
		},
		profession: {
			type: String,
		},
		interests: {
			type: String,
		},
		image: {
			type: String,
			//default: "../public/images/site_cleanup.jpg",
		},
		codes: [{ type: Schema.Types.ObjectId, ref: "CodeFile" }],
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = User;
