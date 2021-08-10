const userCtrl = require("./userCtrl");
const passport = require("passport");

// login
module.exports = function (app) {
  app.post(
    "/login_user",
    passport.authenticate("local", { failureFlash: true }),
    userCtrl.rememberMe,
    userCtrl.getUser
  );

  app.post("/logout_user", userCtrl.logoutUser);

  app.post("/sign_up", userCtrl.signUp);

  app.get("/get_user", userCtrl.getUser);

  // get authentication message
  app.get("/get_message", userCtrl.getMessage);

  //update from language
  app.post("/update_language", userCtrl.updateLanguage);

  app.post("/set_current_db", userCtrl.setCurrentDB);
};
