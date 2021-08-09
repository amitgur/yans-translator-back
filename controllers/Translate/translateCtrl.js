const Translate = require("../../models/Translate");

// get all translates
exports.getTranslations = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
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

exports.updateTranslations = async function (req, res, next) {
  if (!req.user) {
    return next(new Error("user no found"));
  }
  const db = req.body.db || process.env.MONGODB_DB;
  const updateData = req.body;
  let doc;
  try {
    for (const [key, value] of Object.entries(updateData)) {
      // update translated Text
      // update last translation
      // identify incoming language
      [doc] = await Translate[db].find({ key });
      console.log(value);

      const newTranslation = `translatedText.${req.user.languageTo}`;
      const oldTranslation = `lastTranslation.${req.user.languageTo}`;
      const oldText = doc.translatedText[req.user.languageTo];

      const update = { $set: {} };
      update.$set[newTranslation] = value;
      update.$set[oldTranslation] = oldText;

      doc = await Translate[db].findOneAndUpdate({ key: key }, update).exec();
    }
  } catch (err) {
    return next(err);
  }
  res.sendStatus(200);
};

exports.adminEditTranslation = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
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

exports.adminNewTranslation = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
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

exports.adminDeleteTranslation = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
  try {
    const doc = Translate[db].findOneAndDelete(req.body).exec();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.updatePageName = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
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
