const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");

const fileUploader = require("../config/cloudinary.config");
const { route } = require("./compile.routes");

router.get("/codefile", isLoggedIn, (req, res, next) => {
	res.render("codefile");
});

router.post(
	"/codefile",
	fileUploader.single("image"),
	isLoggedIn,
	(req, res, next) => {
		const image = req.file.path;
		const { title, languages } = req.body;

		if (!languages || !title) {
			return res.status(400).render("codefile", {
				errorMessage:
					"Some fields are mandatory. Please provide Title and Programming Languages.",
			});
		}

		CodeFile.create({ languages, title, image })
			.then((codefile) => res.redirect(`/compile/${codefile._id}`))
			.catch((err) => next(err));
	}
);

router.get("/codefile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;

	CodeFile.findById(id)
		.populate("code")
		.then((codefile) => {
			const newcodefile = codefile;
			/* const codex = codefile.code.map((item) => item.code); */

			//const codeData = newcodefile.code[0].code;
			const compileData = newcodefile.code[0];
			const data = {
				newcodefile,
				compileData,
			};
			res.render("details", data);
		})
		.catch((err) => next(err));
});

module.exports = router;
