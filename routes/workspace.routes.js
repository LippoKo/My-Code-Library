const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");

router.get("/workspace", isLoggedIn, (req, res, next) => {
	CodeFile.find().then((codefile) => {
		res.render("workspace", { codefile });
	});
});

module.exports = router;
