const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");

router.get("/editprofile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;
	const user = req.session.user;
	User.findById(id)
		.then((userObj) => {
			console.log(user);
			res.render("editprofile", userObj);
		})
		.catch((err) => console.log(err));
});

router.post(
	"/editprofile/:id",
	isLoggedIn,
	fileUploader.single("image"),
	(req, res, next) => {
		const { id } = req.params;
		const { username, email, profession, interests, previousUrl } = req.body;
		const user = req.session.user;

		let image;

		if (req.file) {
			image = req.file.path;
		} else {
			image = previousUrl;
		}

		User.findByIdAndUpdate(
			id,
			{ username, email, profession, interests, image },
			{ new: true }
		)
			.then(() => res.redirect("/profile"))
			.catch((err) => next(err));
	}
);

module.exports = router;
