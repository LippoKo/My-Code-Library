const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const Compile = require("../models/Compile.model");
const CodeFile = require("../models/CodeFile.model");

router.get("/workspace", isLoggedIn, (req, res, next) => {
	CodeFile.find().then((compileFile) => {
		res.render("workspace", { compileFile });
	});
	res.render("workspace");
});

module.exports = router;
