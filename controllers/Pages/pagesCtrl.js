const Page = require("../../models/Page");

// get all pages
exports.getPages = async function (req, res, next) {
  try {
    const pages = await Page.find({}).exec();
    res.send(pages);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updatePage = async function (req, res, next) {
  const oldName = req.body.oldName;
  const newName = req.body.newName;
  try {
    Page.findOneAndUpdate({ name: oldName }, { name: newName }, function (err) {
      if (err) {
        console.log("Error in update page: " + err, "error");
        message = "Some error occurred";
        return res.json({ status: "error", msg: message });
      }
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.addPage = async function (req, res, next) {
  const page = new Page(req.body);
  try {
    page.save(function (err) {
      if (err) {
        console.log("Error in create new item: " + err, "error");
        message = "Some error occurred";
        return res.json({ status: "error", msg: message });
      }
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deletePage = async function (req, res, next) {
  try {
    const doc = Page.findOneAndDelete(req.body).exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
