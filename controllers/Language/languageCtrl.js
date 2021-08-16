const { Schema } = require("mongoose");
const Language = require("../../models/Language");

// When an admin creates a new translation generate key and value pair for it
exports.adminNewLanguageTranslation = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  try {
    // In theory "language" should always be "en" for a new translation,
    // but can be something else if admin is choosing to translate
    // FROM a different language
    const update = { $set: {} };
    const newTranslation = `${req.body.page}.${req.body.key}`;
    update.$set[newTranslation] =
      req.body.translatedText[req.user.languageFrom];

    const doc = await Language[db]
      .findOneAndUpdate({ language: req.user.languageFrom }, update, {
        upsert: true,
      })
      .exec();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.adminDeleteLanguageTranslation = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];
  const update = { $unset: {} };
  const deleteTranslation = `${req.body.page}.${req.body.key}`;
  update.$unset[deleteTranslation] = "";

  res.sendStatus(200);
  try {
    const doc = await Language[db].updateMany({}, update).exec();
  } catch (err) {
    next(err);
  }
};

exports.adminEditLanguageTranslation = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];
  const oldPage = req.body.currentPage;
  const newPage = req.body.data.page;
  const oldKey = req.body.currentKey;
  const newKey = req.body.data.key;
  const newTranslation = req.body.data.translatedText[req.user.languageFrom];

  try {
    console.log({
      oldPage: oldPage,
      newPage: newPage,
      oldKey: oldKey,
      newKey: newKey,
      newTranslation: newTranslation,
    });

    // in the case that they changed the page
    // -> $unset from one page and set to another in all languages
    // in the case that they change key
    // -> we have to $rename property in all languages
    // in the case that they change translation
    // -> we have to $set the value at the key

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
