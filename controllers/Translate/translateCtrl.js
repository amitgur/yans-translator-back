const Translate = require("../../models/Translate");


// get all translates
exports.getTranslates = async function (req, res, next) {
  try {
    const translates = await Translate.find(
        {},
        { _id: false }
    )
        .lean()
        .exec();
    res.send(translates);
  } catch (err) {
    next(err);
  }
};
