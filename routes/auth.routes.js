// Require

const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Models
const User = require("../models/User.model");
//const CodeFile = require("../models/CodeFile.model");
//const Compile = require("../models/Compile.model");

// Rounds to bcrypt run the salt
const saltRounds = 10;

// Middleware to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/*------ Routes ------*/

// SignUp Route
router.get("/signup", isLoggedOut, (req, res, next) => {
	res.render("auth/signup");
});

router.post("/signup", isLoggedOut, (req, res, next) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.render("auth/signup", {
			errorMessage:
				"All fields are mandatory. Please provide your username, email and password",
		});
		return;
	}

	// Create a User
	bcrypt
		.genSalt(saltRounds)
		.then((salt) => bcrypt.hash(password, salt))
		.then((hashedPassword) => {
			return User.create({ username, email, password: hashedPassword });
		})
		.then(() => res.redirect("/auth/login"))
		.catch((err) => {
			if (err instanceof mongoose.Error.ValidationError) {
				console.log(err);
				res.status(500).render("auth/signup", { errorMessage: err.message });
			} else if (err.code === 11000) {
				console.log(err);
				res.status(500).render("auth/signup", {
					errorMessage:
						"Please provide a unique username or email. The one you chose is already taken.",
				});
			} else {
				next(err);
			}
		});

	if (!username) {
		return res.status(400).render("auth/signup", {
			errorMessage: "Please provide your username.",
		});
	}

	if (password.length < 8) {
		return res.status(400).render("auth/signup", {
			errorMessage: "Your password needs to be at least 8 characters long.",
		});
	}
});

// Login Route
router.get("/login", isLoggedOut, (req, res, next) => {
	res.render("auth/login");
});

router.post("/login", isLoggedOut, (req, res, next) => {
	const { username, password } = req.body;

	if (!username) {
		return res.status(400).render("auth/login", {
			errorMessage: "Please provide your username.",
		});
	}

	if (password.length < 8) {
		return res.status(400).render("auth/login", {
			errorMessage: "Your password needs to be at least 8 characters long.",
		});
	}

	//// Search Username submitted in the database
	User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(400).render("auth/login", {
					errorMessage: "Wrong credentials.",
				});
			}

			// Compare passwords
			bcrypt.compare(password, user.password).then((samePassword) => {
				if (!samePassword) {
					return res.status(400).render("auth/login", {
						errorMessage: "Wrong credentials.",
					});
				}
				req.session.user = user;
				return res.redirect("/");
			});
		})
		.catch((err) => {
			next(err);
		});
});

router.get("/logout", isLoggedIn, (req, res, next) => {
	res.render("auth/logout");
});

router.post("/logout", isLoggedIn, (req, res, next) => {
	req.session.destroy((err) => {
		if (err) next(err);
		res.redirect("/auth/login");
	});
});

module.exports = router;
