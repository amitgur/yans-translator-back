const translateCtrl = require("./translateCtrl");

// login
module.exports = function (app) {

  app.get("/get_translates", translateCtrl.getTranslates);

 };
