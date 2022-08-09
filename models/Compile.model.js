const { Schema, model } = require("mongoose");

const compileSchema = new Schema(
	{
		language: {
			type: [String],
			required: true,
		},
		code: {
			type: [String],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Compile = model("Compile", compileSchema);

module.exports = Compile;
