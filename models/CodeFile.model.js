const { Schema, model } = require("mongoose");

const codeFileSchema = new Schema(
	{
		language: {
			type: [String],
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		code: {
			type: [id],
			required: true,
		},
		image: {
			type: [String],
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const User = model("CodeFile", userSchema);

module.exports = CodeFile;
