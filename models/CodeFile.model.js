const { Schema, model } = require("mongoose");

const codeFileSchema = new Schema(
	{
		languages: {
			type: [String],
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		snippets: {
			type: [
				{
					language: String,
					code: String,
				},
			],
		},
		image: {
			type: String,
			//default: "../public/images/site_cleanup.jpg",
		},
	},
	{
		timestamps: true,
	}
);

const CodeFile = model("CodeFile", codeFileSchema);

module.exports = CodeFile;
