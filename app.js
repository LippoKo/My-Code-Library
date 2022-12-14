// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

hbs.registerHelper("index_of", function (context, ndx) {
	return context[ndx];
});

hbs.registerHelper(`includes`, function (a, b, opts) {
	if (a.includes(b)) {
		return opts.fn(this);
	}
	return opts.inverse(this);
});

const capitalized = require("./utils/capitalized");
const projectName = "Project2";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const workspaceRoutes = require("./routes/workspace.routes");
app.use("/", workspaceRoutes);

const codeFileRoutes = require("./routes/codefile.routes");
app.use("/", codeFileRoutes);

const compileRoutes = require("./routes/compile.routes");
app.use("/", compileRoutes);

const editRoutes = require("./routes/editcodefile.routes");
app.use("/", editRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);

const editprofileRoutes = require("./routes/editprofile.routes");
app.use("/", editprofileRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
