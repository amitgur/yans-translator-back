const Page = require("../../models/Page");

// Get all pages
exports.getPages = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];
  if (!db) {
    return next(new Error("You have not been approved for any Databases"));
  }
  try {
    const pages = await Page[db].find({}).exec();
    res.send(pages);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Updates page name
exports.updatePage = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

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

// Adds a new page
exports.addPage = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

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

// Deletes a page
exports.deletePage = async function (req, res, next) {
  const db = req.user.currentDatabase || req.user.databases[0];

  try {
    const doc = Page[db].findOneAndDelete(req.body).exec();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};
