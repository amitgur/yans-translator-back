const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    name: String,
  },
  { collection: "pages" }
);

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
