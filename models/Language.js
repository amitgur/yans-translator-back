const mongoose = require("mongoose");
const cons = require("../config/mongoHandler").cons;
const Language = {};

const languageSchema = new mongoose.Schema(
  {
    language: { type: String, unique: true },
  },
  { collection: "languages", strict: false }
);

// init models
Object.keys(cons).forEach((conn) => {
  Language[conn] = cons[conn].model("Language", languageSchema);
});

module.exports = Language;
