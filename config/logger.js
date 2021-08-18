const winston = require("winston");
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "../", process.env.LOG_DIR);
const moment = require("moment");

// create log dir
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// create logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: path.join(dir, "/error.log"),
      level: "error",
    }),
    new winston.transports.File({ filename: path.join(dir, "/combined.log") }),
  ],
});

//
// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
// add function with ip
logger.ipInfo = function (ip, msg) {
  logger.info(`${ip} - ${msg}`);
};
logger.ipError = function (ip, msg) {
  console.log(`Error : ${ip} - ${msg}`);
  console.trace();
  logger.error(`${ip} - ${msg}`);
};
exports.logger = logger;

/**
 * Logger is declared as a global function.
 */
global.logger = logger;
logger.info(`Application was restarted, in ${process.env.NODE_ENV} mode`);

exports.query = function (req, res, next) {
  const options = {
    // find items in last 2 days
    from: new Date() - 48 * 60 * 60 * 1000,
    until: new Date(),

    // number of results
    limit: 10000,

    order: "desc",
  };

  logger.query(options, function (err, results) {
    if (err) {
      return next(new Error(err));
    }

    let pars = {};

    if (results.hasOwnProperty("file")) {
      results.file.forEach(function (entry) {
        if (entry.level === "error") {
          entry.level = "danger";
        }
        entry.timestamp = moment(entry.timestamp)
          .utcOffset(3)
          .format("H[:]m - D[/]M");
      });
      pars.log = results.file;
    } else {
      return next(new Error("Working on console errors only"));
    }

    res.json(pars);
  });
};
