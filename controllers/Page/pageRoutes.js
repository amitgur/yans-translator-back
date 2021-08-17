const pageCtrl = require("./pageCtrl");

// login
module.exports = function (app) {
  // Gets all pages
  app.get("/get_pages", pageCtrl.getPages);

  // Updates page
  app.post("/update_page", pageCtrl.updatePage);

  // Adds a page
  app.post("/add_page", pageCtrl.addPage);

  // Deletes a page
  app.delete("/delete_page", pageCtrl.deletePage);
};
