const User = require("../models/user");
const passwordUtils = require("../lib/passwordUtils");
const passport = require("passport");

const { body, validationResult } = require("express-validator");

exports.login_get = (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

exports.login_post = passport.authenticate("local", {
  failureRedirect: "/login-failure",
  successRedirect: "/login-success",
});

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// User create form
exports.register_get = (req, res) => {
  res.render("user_form", { title: "Create User", errors: false });
};

// Handle User create on POST.
exports.register_post = [
  // Validate and sanitize the name field.
  body("name", "Username required").trim().isLength({ min: 1 }).escape(),
  body("password", "Password required").isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // generates a salted hash from user input
    const saltHash = passwordUtils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    // Create a user object with escaped and trimmed data.
    const user = new User({
      username: req.body.name,
      hash: hash,
      salt: salt,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("user_form", {
        title: "Create User",
        user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if User with same name already exists.
      User.findOne({ username: req.body.name }).exec((err, found_user) => {
        if (err) {
          return next(err);
        }

        if (found_user) {
          // User exists, redirect to its detail page.
          res.redirect(found_user.url);
        } else {
          user.save((err) => {
            if (err) {
              return next(err);
            }
            // User saved. Redirect to genre detail page.
            res.redirect(user.url);
          });
        }
      });
    }
  },
];
