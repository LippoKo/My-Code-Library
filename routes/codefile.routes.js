const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");
//const { route } = require("./compile.routes");

router.get("/codefile", isLoggedIn, (req, res, next) => {
	res.render("codefile");
});

router.post(
	"/codefile",
	fileUploader.single("image"),
	isLoggedIn,
	async (req, res, next) => {
		try {
			const { title, languages } = req.body;
			const user = req.session.user;
			let image;

			if (req.file) {
				image = req.file.path;
			} else {
				image =
					"https://i.kym-cdn.com/entries/icons/facebook/000/002/232/bullet_cat.jpg";
			}

			if (!languages || !title) {
				return res.status(400).render("codefile", {
					errorMessage:
						"Some fields are mandatory. Please provide Title and Programming Languages.",
				});
			}

			const newCodeFile = await CodeFile.create({ languages, title, image });

			await User.findByIdAndUpdate(user._id, {
				$push: {
					codes: newCodeFile._id,
				},
			});

			res.redirect(`/compile/${newCodeFile._id}`);
		} catch (error) {
			next(error);
		}
	}
);

router.get("/codefile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;

	CodeFile.findById(id)
		.then((codefile) => {
			res.render("details", codefile);
		})
		.catch((err) => next(err));
});

router.post("/codefile/:id/delete", isLoggedIn, (req, res, next) => {
	const { id } = req.params;

	CodeFile.findByIdAndDelete(id)
		.then(() => res.redirect("/workspace"))
		.catch((err) => next(err));
});

module.exports = router;
