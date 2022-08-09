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

router.post("/compile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;
	const { language, code } = req.body;

	Compile.create({ language, code })
		.then((compileFile) => {
			console.log(compileFile);
			return CodeFile.findByIdAndUpdate(id, {
				$push: { code: compileFile._id },
			});
		})
		.then(() => res.redirect("/workspace"))
		.catch((err) => next(err));
});

module.exports = router;
