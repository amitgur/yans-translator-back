const translateCtrl = require("./translateCtrl");

// login
module.exports = function (app) {
  // Get all translations
  app.get("/get_translations", translateCtrl.getTranslations);

  // Updates translations
  app.post("/update_translations", translateCtrl.updateTranslations);

  // When admin edits a translation
  app.post("/admin_edit_translation", translateCtrl.adminEditTranslation);

  // When admin adds a translation
  app.post("/admin_new_translation", translateCtrl.adminNewTranslation);

  // When admin deletes a translation
  app.delete("/admin_delete_translation", translateCtrl.adminDeleteTranslation);

  // Update the page based on translations
  app.post("/admin_update_page", translateCtrl.updatePage);
};
