const pageCtrl = require("./pageCtrl");

// login
module.exports = function (app) {
  app.get("/get_pages", pageCtrl.getPages);

  app.post("/update_page", pageCtrl.updatePage);

  app.post("/add_page", pageCtrl.addPage);

  app.delete("/delete_page", pageCtrl.deletePage);
};
