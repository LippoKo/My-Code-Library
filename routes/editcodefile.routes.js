const router = require("express").Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const CodeFile = require("../models/CodeFile.model");

const fileUploader = require("../config/cloudinary.config");

router.get("/editcodefile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;

	CodeFile.findById(id)
		.then((codefile) => {
			res.render("editcodefile", codefile);
		})
		.catch((err) => next(err));
});

router.post(
	"/editcodefile/:id",
	fileUploader.single("image"),
	isLoggedIn,
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const { title, languages, previousUrl } = req.body;

			let image;

			if (req.file) {
				image = req.file.path;
			} else {
				image = previousUrl;
			}

			if (!languages || !title) {
				return res.status(400).render("codefile", {
					errorMessage:
						"Some fields are mandatory. Please provide Title and Programming Languages.",
				});
			}

			let codeFile = await CodeFile.findById(id);

			let newSnippets = languages.map((el) => {
				if (codeFile.languages.includes(el)) {
					return codeFile.snippets.find((val) => val.language === el);
				} else {
					return { language: el, code: " " };
				}
			});

			let newCodeFile = await CodeFile.findByIdAndUpdate(
				id,
				{
					languages,
					title,
					image,
					snippets: newSnippets,
				},
				{ new: true }
			);

			console.log(newCodeFile);

			res.redirect(`/editcompile/${codeFile._id}`);
		} catch (error) {
			next(error);
		}
	}
);

router.get("/editcompile/:id", isLoggedIn, (req, res, next) => {
	const { id } = req.params;

	CodeFile.findById(id)
		.then((codeFile) => {
			console.log(codeFile);
			res.render("editcompile", codeFile);
		})
		.catch((err) => next(err));
});

router.post("/editcompile/:id", (req, res, next) => {
	const { id } = req.params;
	const { language, code } = req.body;
	let snippets = language.map((el, i) => {
		return { language: el, code: code[i] };
	});

	CodeFile.findByIdAndUpdate(id, { snippets })
		.then((codeFile) => {
			console.log(codeFile);
			res.redirect(`/codefile/${codeFile._id}`);
		})
		.catch((err) => next(err));
});

module.exports = router;
