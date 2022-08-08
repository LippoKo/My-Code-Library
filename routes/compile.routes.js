const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");
const Compile = require("../models/Compile.model");

router.get("/compile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;
	CodeFile.findById(id)
		.then((codefile) => {
			res.render("compile", codefile);
		})
		.catch((err) => next(err));
});

router.post("/compile/:id", isLoggedIn, (req, res, nest) => {
	const { id } = req.params;
	const { language, code } = req.body;

	console.log(req.body);
	Compile.create({ id }, { language, code })
		.then(() => res.redirect("/workspace"))
		.catch((err) => next(err));
});

module.exports = router;
