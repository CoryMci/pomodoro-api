const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const async = require("async");

exports.user_detail = (req, res) => {
  async.parallel(
    {
      project_count(callback) {
        Project.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      task_count(callback) {
        Task.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.json({
        title: "Default user",
        data: results,
      });
    }
  );
};

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// User create form
exports.user_create_get = (req, res) => {
  res.render("user_form", { title: "Create User", errors: false });
};

// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitize the name field.
  body("name", "Username required").trim().isLength({ min: 1 }).escape(),
  body("email", "Must be a valid email address").isEmail(),
  body("password", "Password required").isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    const user = new User({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

// // Display User delete form on GET. -> deferred until we add new user option
// exports.user_delete_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: User delete GET");
// };

// // Handle User delete on POST. -> deferred until we add new user option
// exports.user_delete_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: User delete POST");
// };

// // Display User update form on GET. -> deferred until we add new user option
// exports.user_update_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: User update GET");
// };

// // Handle User update on POST. -> deferred until we add new user option
// exports.user_update_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: User update POST");
// };
