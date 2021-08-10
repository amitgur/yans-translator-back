const mongoose = require("mongoose");
const cons = require("../config/mongoHandler").cons;
const Language = {};

const languageSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    pages: Object,
  },
  { collection: "languages" }
);

// init models
Object.keys(cons).forEach((conn) => {
  Language[conn] = cons[conn].model("Language", languageSchema);
});

module.exports = Language;
