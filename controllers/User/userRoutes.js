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

  //TODO: update language from settings
  app.post("/update_languages", userCtrl.updateLanguages);
  //TODO: update password
  //TODO: update privileges
};
