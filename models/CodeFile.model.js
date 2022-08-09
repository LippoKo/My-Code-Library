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
		code: {
			type: [{ type: Schema.Types.ObjectId, ref: "Compile" }],
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
