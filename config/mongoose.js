/**
 * Connect to MongoDB.
 */
const mongoose = require("mongoose");

module.exports = function () {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);

  mongoose.connect(process.env.MONGODB_URI);
  console.log(`trying connection to ${process.env.MONGODB_URI}`);

  mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running.`
    );
    process.exit();
  });

  mongoose.connection.on("connected", function () {
    console.log(`Mongoose connected to ${process.env.MONGODB_URI}`);
  });
};
