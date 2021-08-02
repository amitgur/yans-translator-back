const mongoose = require("mongoose");

const translateSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  language: String, // two chars language. comes from bandpad-common
  page: { type: String },
  // description of this token
  description: String,

  /**
   * { "en": "Ok", "he": "טוב" ...}
   */
  translatedText: Object,
  translator: Object,
  // same as translatedText but with the last translation
  lastTranslation: { type: Object, default: {} },
});

const Translate = mongoose.model("Translate", translateSchema);

module.exports = Translate;
