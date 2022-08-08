const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");

router.get("/codefile", isLoggedIn, (req, res, next) => {
	res.render("codefile");
});

router.post("/codefile", isLoggedIn, (req, res, next) => {
	const { title, languages } = req.body;

	console.log(req.body);

	if (!languages || !title) {
		return res.status(400).render("codefile", {
			errorMessage:
				"Some fields are mandatory. Please provide Programming Language, Title and Code.",
		});
	}

	if (!languages) {
		return res.status(400).render("codefile", {
			errorMessage: "Please provide your Programming Language.",
		});
	}

	if (!title) {
		return res.status(400).render("codefile", {
			errorMessage: "Please provide your title.",
		});
	}

	CodeFile.create({ languages, title })
		.then((codefile) => res.redirect(`/compile/${codefile._id}`))
		.catch((err) => next(err));
});

module.exports = router;
