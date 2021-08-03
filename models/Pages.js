const mongoose = require("mongoose");

const pagesSchema = new mongoose.Schema(
  {
    list: Array,
  },
  { collection: "pages" }
);

const Pages = mongoose.model("Pages", pagesSchema);

module.exports = Pages;
