const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  console.log("Loading user environment for passport");
  const Users = require("../models/User");

  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    Users.findOne(
      {
        _id: id,
      },

      "-salt -hashed_password",
      function (err, user) {
        done(err, user);
      }
    );
  });

  // Use local strategy
  passport.use(
    new LocalStrategy(function (username, password, done) {
      Users.findOne(
        {
          username: username,
        },
        "",
        function (err, user) {
          if (err) {
            return done(null, false, {
              message: "Error in login user",
            });
          }
          if (!user) {
            return done(null, false, {
              message: "Email wasn't found",
            });
          }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: "Wrong password",
            });
          }
          return done(null, user);
        }
      );
    })
  );
};
