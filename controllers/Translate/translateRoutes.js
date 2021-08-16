const translateCtrl = require("./translateCtrl");

// login
module.exports = function (app) {
  app.get("/get_translations", translateCtrl.getTranslations);

  app.post("/update_translations", translateCtrl.updateTranslations);

  app.post("/admin_edit_translation", translateCtrl.adminEditTranslation);

  app.post("/admin_new_translation", translateCtrl.adminNewTranslation);

  app.delete("/admin_delete_translation", translateCtrl.adminDeleteTranslation);

  app.post("/admin_update_page", translateCtrl.updatePage);
};
