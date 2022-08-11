const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");
const User = require("../models/User.model");

router.get("/workspace", isLoggedIn, (req, res, next) => {
	const user = req.session.user;
	User.findById(user._id)
		.populate("codes")
		.then((user) => {
			console.log(user);
			res.render("workspace", user);
		});
});

module.exports = router;
