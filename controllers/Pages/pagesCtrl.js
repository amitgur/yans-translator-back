const Page = require("../../models/Page");

// get all pages
exports.getPages = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
  try {
    const pages = await Page[db].find({}).exec();
    res.send(pages);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updatePage = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
  try {
    Page[db].findOneAndUpdate(
      { name: req.body.oldName },
      { name: req.body.newName },
      function (err) {
        if (err) {
          return next(err);
        }
      }
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.addPage = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
  const page = new Page[db](req.body);
  try {
    page.save(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

exports.deletePage = async function (req, res, next) {
  const db = req.body.db || process.env.MONGODB_DB;
  try {
    const doc = Page[db].findOneAndDelete(req.body).exec();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};
