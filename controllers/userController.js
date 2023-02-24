const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/user");
const TimeLog = require("../models/timeLog");
const passwordUtils = require("../lib/Utils");

const { body, validationResult } = require("express-validator");
const async = require("async");

exports.user_detail = (req, res) => {
  async.parallel(
    {
      projects(callback) {
        Project.find({ user: req.user._id }, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      tasks(callback) {
        Task.find({ user: req.user._id }, callback).populate("project");
      },
      logs(callback) {
        TimeLog.find({ user: req.user._id }, callback);
      },
    },
    (err, results) => {
      res.json({
        summary: results,
      });
    }
  );
};

// User create form
exports.user_create_get = (req, res) => {
  res.render("user_form", { title: "Create User", errors: false });
};

// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitize the name field.
  body("name", "Username required").trim().isLength({ min: 1 }),
  body("password", "Password required").isLength({ min: 1 }),

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
