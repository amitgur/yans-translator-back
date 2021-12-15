const Translate = require("../../models/Translate");

// Get all translations
exports.getTranslations = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  try {
    const translations = await Translate[db]
      .find({}, { _id: false })
      .lean()
      .exec();
    res.send(translations);
  } catch (err) {
    next(err);
  }
};

// Updates translations
exports.updateTranslations = async function (req, res, next) {
  if (!req.user) {
    return next(new Error("user not found"));
  }
  const db = req.user.currentDatabase || req.user.databases[0];

  let doc;
  try {
    for (const [key, value] of Object.entries(req.body)) {
      // update translated Text
      // update last translation
      // identify incoming language
      [doc] = await Translate[db].find({ key });

      const newTranslation = `translatedText.${req.user.languageTo}`;
      const oldTranslation = `lastTranslation.${req.user.languageTo}`;
      const oldText = doc.translatedText[req.user.languageTo];

      const update = { $set: {} };
      update.$set[newTranslation] = value.translation;
      update.$set[oldTranslation] = oldText;

      doc = await Translate[db].findOneAndUpdate({ key: key }, update).exec();
    }
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

// When admin edits a translation
exports.adminEditTranslation = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  const update = req.body;
  try {
    const doc = Translate[db]
      .findOneAndUpdate({ key: update.currentKey }, update.data)
      .exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// When admin adds a translation
exports.adminNewTranslation = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  const translation = new Translate[db](req.body);
  try {
    translation.save(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

// When admin deletes a translation
exports.adminDeleteTranslation = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  try {
    const doc = Translate[db].findOneAndDelete(req.body).exec();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// Update the page based on translations
exports.updatePage = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  try {
    const doc = Translate[db]
      .updateMany(
        { page: req.body.oldPageName },
        { page: req.body.newPageName }
      )
      .exec();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
