const languageCtrl = require("./languageCtrl");

module.exports = function (app) {
  // When translator updates, send all translations via key to the language database
  app.post(
    "/update_language_translations",
    languageCtrl.updateLanguageTranslations
  );

  // When admin generates a new translation, send new data to language
  app.post(
    "/admin_new_language_translation",
    languageCtrl.adminNewLanguageTranslation
  );

  // When admin deletes a translation, delete from all languages
  app.delete(
    "/admin_delete_language_translation",
    languageCtrl.adminDeleteLanguageTranslation
  );

  // When admin edits a translation, send new data to language
  app.post(
    "/admin_edit_language_translation",
    languageCtrl.adminEditLanguageTranslation
  );

  // When admin deletes a page name, delete page key
  app.delete(
    "/admin_delete_language_page",
    languageCtrl.adminDeleteLanguagePage
  );

  // When admin changes a page name, rename page key
  app.post("/admin_update_language_page", languageCtrl.adminUpdateLanguagePage);

  // Add page name
  app.post("/admin_add_language_page", languageCtrl.adminAddLanguagePage);


  // Get language
  app.get("/get_language", languageCtrl.getLanguage);

};
