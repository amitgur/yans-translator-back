const translateCtrl = require("./translateCtrl");

// login
module.exports = function (app) {
  app.get("/get_translations", translateCtrl.getTranslations);

  app.post("/update_translations", translateCtrl.updateTranslations);
};
