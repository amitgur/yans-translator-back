const Pages = require("../../models/Pages");

// get all pages
exports.getPages = async function (req, res, next) {
  try {
    const [pages] = await Pages.find({}).exec();
    res.send(pages);
  } catch (err) {
    next(err);
  }
};

exports.updatePages = async function (req, res, next) {
  try {
    Pages.findOneAndUpdate({}, { list: req.body.newPages }, function (err) {
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
