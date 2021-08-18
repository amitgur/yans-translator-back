/**
 * Module dependencies.
 */
const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoHandler = require("./config/mongoHandler");

// Load environment variables from .env file to process.env, where API keys and passwords are configured.
dotenv.config({ path: ".env" });

// connect to mongo
mongoHandler.connectDB(`mongodb://localhost:27017/${process.env.MONGO_DB}`);
mongoHandler.connectDBS();

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
    `App is running at \x1b[33mhttp://localhost:${app.get(
      "port"
    )}\x1b[0m in ${app.get("env")} mode`
  );
  console.log("  Press CTRL-C to stop\n");
});

setTimeout(() => {}, 4000);

module.exports = app;
