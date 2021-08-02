const User = require("../../models/User");

// SignUp Post
exports.signUp = function (req, res, next) {
  let user = new User(req.body);
  let message = null;

  user.save(function (err) {
    if (err) {
      console.log("Error in create user: " + err, "error");
      switch (err.code) {
        case 11000:
        case 11001:
          message = "This username aleady exist";
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
};

exports.getUser = async function (req, res) {
  if (!req.user) {
    return res.sendStatus(403);
  } else {
    let user = {
      id: req.user._id,
      name: req.user.name,
      languageFrom: req.user.languageFrom,
      languageTo: req.user.languageTo,
      profile: req.user.profile,
    };

    return res.json(user);
  }
};

exports.logoutUser = async function (req, res) {
  await req.logOut();
  req.session.destroy(function (err) {
    return res.sendStatus(200);
  });
};

// get error message
exports.getMessage = function (req, res) {
  let msg = req.flash();
  if (msg.hasOwnProperty("error")) {
    msg = msg.error[0];
  } else {
    msg = "Some error occurs";
  }
  return res.send(msg);
};

exports.rememberMe = function (req, res, next) {
  // remember me

  if (req.user && req.body.rememberMe) {
    logger.info(
      "Login, rememberMe: true, user: " + (req.user ? req.user.name : "noUser")
    );
    // save for two month
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30 * 2;
  } else {
    logger.info(
      "Login, rememberMe: false, user: " + (req.user ? req.user.name : "noUser")
    );
    req.session.cookie.expires = false;
  }
  next();
};

exports.updateLanguages = async function (req, res, next) {
  const update = {
    languageFrom: req.body.from.tag,
    languageTo: req.body.to.tag,
  };

  doc = await User.findByIdAndUpdate(req.body.id, update).exec();

  res.sendStatus(200);
};
