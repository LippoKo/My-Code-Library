const { Schema, model } = require("mongoose");

const compileSchema = new Schema(
	{
		language: {
			type: [String],
			required: true,
		},
		code: {
			type: [id],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);