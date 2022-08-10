const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");

router.get("/compile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;
	CodeFile.findById(id)
		.then((codefile) => {
			res.render("compile", codefile);
		})
		.catch((err) => next(err));
});

router.post("/compile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;
	const { language, code } = req.body;

	let snippets;
	if (typeof language !== "string") {
		snippets = language.map((el, i) => {
			return { language: el, code: code[i] };
		});
	} else {
		snippets = { language, code };
	}

	CodeFile.findByIdAndUpdate(id, { snippets })
		.then((codeFile) => {
			console.log(codeFile);
			res.redirect("/workspace");
		})
		.catch((err) => next(err));
});

module.exports = router;
