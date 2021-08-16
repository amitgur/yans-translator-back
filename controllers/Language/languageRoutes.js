const languageCtrl = require("./languageCtrl");

module.exports = function (app) {
  // gets all translations from a specific language
  app.get("/get_language", languageCtrl.getLanguage);

  // when translator updates send all translations via key to the language database
  app.post(
    "/update_language_translations",
    languageCtrl.updateLanguageTranslations
  );

  // when admin edits a translation, send new data to language
  app.post(
    "/admin_edit_language_translation",
    languageCtrl.adminEditLanguageTranslation
  );

  // when admin generates a new translation, send new data to language
  app.post(
    "/admin_new_language_translation",
    languageCtrl.adminNewLanguageTranslation
  );

  // when admin deletes a translation, delete from all languages
  app.delete(
    "/admin_delete_language_translation",
    languageCtrl.adminDeleteLanguageTranslation
  );

  // when admin changes a page name, rename page key;
  app.post(
    "/admin_update_language_page_name",
    languageCtrl.adminUpdateLanguagePageName
  );

  // when admin deletes a page name, delete page key;
  app.delete(
    "/admin_delete_language_page_name",
    languageCtrl.adminDeleteLanguagePageName
  );

  // TODO: add page name?
};
