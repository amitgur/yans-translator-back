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

  // When the user logs out
  app.post("/logout_user", userCtrl.logoutUser);

  // SignUp Post
  app.post("/sign_up", userCtrl.signUp);

  // Gets all info from the user
  app.get("/get_user", userCtrl.getUser);

  // Get authentication message
  app.get("/get_message", userCtrl.getMessage);

  // Update the langage FROM
  app.post("/update_language", userCtrl.updateLanguage);

  // Sets the database to contain the current data
  app.post("/set_current_db", userCtrl.setCurrentDB);

  app.get("/admin_get_users", userCtrl.adminGetUsers);
};
