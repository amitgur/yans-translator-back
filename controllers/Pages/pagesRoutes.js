const pagesCtrl = require("./pagesCtrl");

// login
module.exports = function (app) {
  app.get("/get_pages", pagesCtrl.getPages);

  app.post("/update_pages", pagesCtrl.updatePages);
};
