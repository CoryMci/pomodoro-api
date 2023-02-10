const User = require("../models/user");
const Utils = require("../lib/Utils");

const { body, validationResult } = require("express-validator");

exports.login_get = (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

exports.login_post = (req, res, next) => {
  User.findOne({ username: req.body.username }) //Check database for username
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }
      const isValid = Utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      ); //Check if password is valid

      if (isValid) {
        const tokenObj = Utils.issueJWT(user);
        return res.status(200).json({
          success: true,
          token: tokenObj.token,
          expiresIn: tokenObj.expires,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, msg: "incorrect password" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.login_success = (req, res, next) => {
  res.status(200).json({ result: "success" });
};

exports.auth_failure = (req, res, next) => {
  res.status(401).json({ result: "failure" });
};

// User create form
exports.register_get = (req, res) => {
  res.render("user_form", { title: "Create User", errors: false });
};

// Handle User create on POST.
exports.register_post = [
  // Validate and sanitize the name field.
  body("username", "Username required").trim().isLength({ min: 1 }).escape(),
  body("password", "Password required").isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // generates a salted hash from user input
    const saltHash = Utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    // Create a user object with escaped and trimmed data.
    const user = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json({ errors: errors.array() });
      return;
    } else {
      // Data from form is valid.
      // Check if User with same name already exists.
      User.findOne({ username: req.body.username }).exec((err, found_user) => {
        if (err) {
          return next(err);
        }

        if (found_user) {
          // User exists
          res.status(400).json({ message: "username taken!" });
        } else {
          user.save((err) => {
            if (err) {
              return next(err);
            }
            // User saved.
            res.status(200).json({ message: "successfully registered!" });
          });
        }
      });
    }
  },
];
