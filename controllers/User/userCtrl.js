const User = require("../../models/User");

// SignUp Post
exports.signUp = function (req, res, next) {
  let user = new User(req.body);
  let message = null;
  try {
    user.save(function (err) {
      if (err) {
        console.log("Error in create user: " + err, "error");
        switch (err.code) {
          case 11000:
          case 11001:
            message = "This username already exist";
            break;
          default:
            message = "Some error occurred";
        }
        return res.json({ status: "error", msg: message });
      }

      return res.json({
        status: "ok",
        msg: "Sign up successfully",
      });
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async function (req, res) {
  try {
    if (!req.user) {
      return res.sendStatus(403);
    } else {
      let user = {
        id: req.user._id,
        name: req.user.name,
        profile: req.user.profile,
        languageFrom: req.user.languageFrom,
        languageTo: req.user.languageTo,
        databases: req.user.databases,
        currentDatabase: req.user.currentDatabase,
      };

      return res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

exports.logoutUser = async function (req, res) {
  try {
    await req.logOut();
    req.session.destroy(function (err) {
      return res.sendStatus(200);
    });
  } catch (err) {
    next(err);
  }
};

// get error message
exports.getMessage = function (req, res) {
  try {
    let msg = req.flash();
    if (msg.hasOwnProperty("error")) {
      msg = msg.error[0];
    } else {
      msg = "Some error occurs";
    }
    return res.send(msg);
  } catch (err) {
    next(err);
  }
};

exports.rememberMe = function (req, res, next) {
  try {
    // remember me
    if (req.user && req.body.rememberMe) {
      logger.info(
        "Login, rememberMe: true, user: " +
          (req.user ? req.user.name : "noUser")
      );
      // save for two month
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30 * 2;
    } else {
      logger.info(
        "Login, rememberMe: false, user: " +
          (req.user ? req.user.name : "noUser")
      );
      req.session.cookie.expires = false;
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.updateLanguage = async function (req, res, next) {
  console.log(req.body);
  try {
    const doc = await User.findByIdAndUpdate(req.body.id, {
      languageFrom: req.body.from,
    }).exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.setCurrentDB = async function (req, res, next) {
  try {
    const doc = await User.findByIdAndUpdate(req.body.id, {
      currentDatabase: req.body.currentDB,
    }).exec();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
