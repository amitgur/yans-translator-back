const path = require("path");
const express = require("express");
const expressStatusMonitor = require("express-status-monitor");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const lusca = require("lusca");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const requestIp = require("request-ip");

module.exports = function (app, passport, router) {
  /**
   * Express configuration.
   */

  if (process.env.NODE_ENV === "development") {
    // Show stack on errors
    app.set("showStackError", true);
  }
  app.use(cors());

  app.set("port", process.env.PORT);

  // add status monitor to localhost:YOUR-PORT/status
  app.use(expressStatusMonitor());

  // The middleware will attempt to compress response bodies for all request
  app.use(compression());

  // logging rest calls
  app.use(logger("dev"));

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      name: "YansApp",
      cookie: {
        // maxAge can be changed by rememberMe checkbox
        maxAge: 60 * 60, // 1 hour
      }, // two weeks in milliseconds
      store: new MongoStore({
        url: `mongodb://localhost:27017/${process.env.MONGO_DB}`,
        autoReconnect: true,
      }),
    })
  );
  app.use(passport.initialize());

  // session through passport
  app.use(passport.session());

  // flash message
  app.use(flash());

  app.use(
    lusca({
      xframe: "SAMEORIGIN",
      xssProtection: true,
      referrerPolicy: "same-origin",
    })
  );

  app.disable("x-powered-by");

  // get ip to req.clientIp
  app.use(requestIp.mw());

  // global uri prefix for api
  app.use("/apiV1", router);

  /**
   * Error Handler.
   */

  if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorHandler());
  }

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
};
