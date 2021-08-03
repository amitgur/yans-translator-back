const Translate = require("../../models/Translate");

// get all translates
exports.getTranslations = async function (req, res, next) {
  try {
    const translations = await Translate.find({}, { _id: false }).lean().exec();
    res.send(translations);
  } catch (err) {
    next(err);
  }
};

exports.updateTranslations = async function (req, res, next) {
  // console.log(req.body);
  const updateData = req.body;
  let doc;
  for (const [key, value] of Object.entries(updateData)) {
    // update translated Text
    // update last translation
    // identify incoming language
    [doc] = await Translate.find({ key: key });
    console.log(value);

    const newTranslation = `translatedText.${req.user.languageTo}`;
    const oldTranslation = `lastTranslation.${req.user.languageTo}`;
    const oldText = doc.translatedText[req.user.languageTo];

    const update = { $set: {} };
    update.$set[newTranslation] = value;
    update.$set[oldTranslation] = oldText;

    console.log(update);

    doc = await Translate.findOneAndUpdate({ key: key }, update).exec();
  }

  // const data = await Translate.find({});
  // let lasts;
  // data.forEach(function (document) {
  //   console.log(document.translator);
  //   lasts = document.translator;

  //   Translate.findByIdAndUpdate(document._id, {
  //     $set: {
  //       lastTranslation: {
  //         en: lasts.en.last,
  //         he: lasts.he.last,
  //         de: lasts.de.last,
  //         ar: lasts.ar.last,
  //         ru: lasts.ru.last,
  //       },
  //     },
  //   }).exec();
  // });
  res.sendStatus(200);
};

exports.adminEditTranslation = async function (req, res, next) {
  const update = req.body;
  console.log(update);
  const doc = Translate.findOneAndUpdate(
    { key: update.currentKey },
    update.data
  ).exec();
  res.sendStatus(200);
};

exports.adminNewTranslation = async function (req, res, next) {
  const translation = new Translate(req.body);
  translation.save(function (err) {
    if (err) {
      console.log("Error in create new item: " + err, "error");
      message = "Some error occurred";
      return res.json({ status: "error", msg: message });
    }
  });
  res.sendStatus(200);
};

exports.adminDeleteTranslation = async function (req, res, next) {
  const doc = Translate.findOneAndDelete(req.body).exec();
  res.sendStatus(200);
};

exports.updatePageName = async function (req, res, next) {
  const doc = Translate.updateMany(
    { page: req.body.oldPageName },
    { page: req.body.newPageName }
  ).exec();
  res.sendStatus(200);
};
