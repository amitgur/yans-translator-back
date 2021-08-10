const mongoose = require("mongoose");
const cons = require("../config/mongoHandler").cons;
const Translate = {};

const translateSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    page: { type: String },
    // description of this token
    description: { type: String, default: "" },

    /**
     * { "en": "Ok", "he": "טוב" ...}
     */
    translatedText: Object,
    // same as translatedText but with the last translation
    lastTranslation: { type: Object, default: {} },
  },
  { collection: "translations" }
);

// init models
Object.keys(cons).forEach((conn) => {
  Translate[conn] = cons[conn].model("Translate", translateSchema);
});

module.exports = Translate;
