const pagesCtrl = require("./pagesCtrl");

// login
module.exports = function (app) {
  app.get("/get_pages", pagesCtrl.getPages);

  app.post("/update_page", pagesCtrl.updatePage);

  app.post("/add_page", pagesCtrl.addPage);

  app.delete("/delete_page", pagesCtrl.deletePage);
};
