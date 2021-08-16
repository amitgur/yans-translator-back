const { Schema } = require("mongoose");
const Language = require("../../models/Language");

// TODO: not sure if return call will end function or if that needs to be handled
//       inside the function calling checkAdmin()
function checkAdmin(profile, res) {
  if (profile !== "admin") {
    return res.json({ status: 403, msg: "Not an Admin" });
  }
}

// When an admin creates a new translation generate key and value pair for it
exports.adminNewLanguageTranslation = async function (req, res, next) {
  checkAdmin(req.user.profile, res);

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

// When admin is deleting a translation
exports.adminDeleteLanguageTranslation = async function (req, res, next) {
  checkAdmin(req.user.profile, res);

  const db = req.user.currentDatabase || req.user.databases[0];
  const update = { $unset: {} };
  const deleteTranslation = `${req.body.page}.${req.body.key}`;
  update.$unset[deleteTranslation] = "";

  try {
    const doc = await Language[db].updateMany({}, update).exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// When admin is editing translation page, key, or FROM translation
exports.adminEditLanguageTranslation = async function (req, res, next) {
  checkAdmin(req.user.profile, res);

  const db = req.user.currentDatabase || req.user.databases[0];
  const oldPage = req.body.currentPage;
  const newPage = req.body.data.page;
  const oldKey = req.body.currentKey;
  const newKey = req.body.data.key;
  const translations = req.body.data.translatedText;

  try {
    const removeTranslation = `${oldPage}.${oldKey}`;
    const addTranslation = `${newPage}.${newKey}`;

    if (oldPage === newPage && oldKey === newKey) {
      const update = { $set: {} };
      update.$set[addTranslation] = translations[req.user.languageFrom];
      const doc = await Language[db]
        .findOneAndUpdate({ language: req.user.languageFrom }, update, {
          upsert: true,
        })
        .exec();
    } else {
      for (const language in translations) {
        const update = { $unset: {}, $set: {} };
        update.$unset[removeTranslation] = "";
        update.$set[addTranslation] = translations[language];
        console.log(language, update);
        const doc = await Language[db]
          .findOneAndUpdate({ language: language }, update, {
            upsert: true,
          })
          .exec();
      }
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// Get entire language for a website
exports.getLanguage = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];
  // TODO: need to know user language to read from
  //       will user model differ between TRANSLATION user and WEBSITE user?
  const language = "en";

  try {
    const data = await Language[db]
      .find({ language: language }, { _id: false })
      .lean()
      .exec();
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.updateLanguageTranslations = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  try {
  } catch (err) {
    next(err);
  }
};

// Delete page name field
exports.adminDeleteLanguagePageName = async function (req, res, next) {
  checkAdmin(req.user.profile, res);
  const db = req.user.currentDatabase || req.user.databases[0];

  const update = { $unset: {} };
  update.$unset[req.body.page] = "";

  try {
    const doc = await Language[db].updateMany({}, update).exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// Rename page name field
exports.adminUpdateLanguagePageName = async function (req, res, next) {
  checkAdmin(req.user.profile, res);
  const db = req.user.currentDatabase || req.user.databases[0];

  const update = { $rename: {} };
  update.$rename[req.body.oldName] = req.body.newName;

  try {
    const doc = await Language[db].updateMany({}, update).exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
