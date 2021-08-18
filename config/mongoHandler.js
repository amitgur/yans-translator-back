/**
 * Connect to MongoDB.
 */
const mongoHandler = require("mongoose");
const cons = {};

// connect to all databases
exports.connectDBS = function (mongodbURI) {
  const dbs = process.env.DBS.split(",");

  console.log("\r\nConnected to Databases:");

  dbs.forEach((db) => {

    let uri;

    if (process.env.MONGO_CONNECT_TYPE === 'local') {
      uri = `mongodb://localhost:27017/${db}`;
    } else {
      uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${db}`
    }

    cons[db] = mongoHandler.createConnection(uri);
    console.log("   \x1b[36;1m✓ %s\x1b[0m", db, uri);
  });
  console.log();
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
      `\x1b[31mMongoDB connection error.\x1b[0m Please make sure MongoDB is running.`
    );
    process.exit();
  });

  mongoHandler.connection.on("connected", function () {
    console.log("Mongoose connected to \x1b[32m%s\x1b[0m", mongodbURI);
  });
};

exports.newConnectDB = function (mongodbURI) {
  const connect = mongoHandler.createConnection(mongodbURI);
  console.log(`new connection to ${mongodbURI}`);
};

exports.disconnectDB = function () {
  mongoHandler.disconnect();
};
