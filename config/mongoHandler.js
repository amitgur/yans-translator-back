/**
 * Connect to MongoDB.
 */
const mongoHandler = require("mongoose");
const cons = {};

// connect to all databases
exports.connectDBS = function (mongodbURI) {
  const dbs = process.env.DBS.split(",");

  dbs.forEach((db) => {
    cons[db] = mongoHandler.createConnection(`mongodb://localhost:27017/${db}`);
    console.log(`connected to db ${db}`);
  });
};
exports.cons = cons;

// connect to the main database
exports.connectDB = function (mongodbURI) {
  mongoHandler.set("useFindAndModify", false);
  mongoHandler.set("useCreateIndex", true);
  mongoHandler.set("useNewUrlParser", true);
  mongoHandler.set("useUnifiedTopology", true);

  mongoHandler.connect(mongodbURI);
  console.log(`trying connection to ${mongodbURI}`);

  mongoHandler.connection.on("error", (err) => {
    console.error(err);
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running.`
    );
    process.exit();
  });

  mongoHandler.connection.on("connected", function () {
    console.log(`Mongoose connected to ${mongodbURI}`);
  });
};

exports.newConnectDB = function (mongodbURI) {
  const connect = mongoHandler.createConnection(mongodbURI);
  console.log(`new connection to ${mongodbURI}`);
};

exports.disconnectDB = function () {
  mongoHandler.disconnect();
};
