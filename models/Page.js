const mongoose = require("mongoose");
const cons = require("../config/mongoHandler").cons;
const Page = [];

const pageSchema = new mongoose.Schema(
  {
    name: String,
  },
  { collection: "pages" }
);

// init models
Object.keys(cons).forEach((conn) => {
  Page[conn] = cons[conn].model("Page", pageSchema);
});

module.exports = Page;
