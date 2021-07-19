/**
 * Module dependencies.
 */
const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");

// Load environment variables from .env file to process.env, where API keys and passwords are configured.
dotenv.config({ path: ".env" });

// connect to mongo
require("./config/mongoose")();

// register mongoose models
require("./models");

// create passport
require("./config/passport")(passport);

// create express server.
const app = express();

// Initialise routes by arguments
const router = express.Router();
require("./config/routes")(router);

// express setup
require("./config/express")(app, passport, router);

require("./config/logger");

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
