const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

router.get("/profile", isLoggedIn, (req, res, next) => {
	const user = req.session.user;
	User.findById(user._id)
		.then((user) => {
			res.render("profile", user);
		})
		.catch((err) => next(err));
});

module.exports = router;
