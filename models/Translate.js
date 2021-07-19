const mongoose = require("mongoose");

const translateSchema = new mongoose.Schema({

  key: {type: String, unique: true},
  language: String, // two chars language. comes from bandpad-common
  page: {type: String},
  text: String, // in english, first config of the token
  // description of this token
  description: String,

  /**
   * { "en": "Ok", "he": "טוב" ...}
   */
  translatedText: Object,

  // same as translatedText but with the last translation
  lastTranslate: String,

});

const Translate = mongoose.model("Translate", translateSchema);

module.exports = Translate;
