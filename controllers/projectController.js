const Project = require("../models/project");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const async = require("async");

// Display list of all Projects.
exports.project_list = function (req, res, next) {
  Project.find({})
    .populate("task")
    .exec(function (err, list_projects) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json({ title: "Project List", project_list: list_projects });
    });
};

// detail page for a specific Project.
exports.project_detail = (req, res) => {
  Project.findOne({ _id: req.params.id }).exec((err, found_project) => {
    if (err) {
      res.statusCode = 404;
    }
    if (found_project) {
      res.json(found_project);
    } else {
      res.json({ error: 404 });
    }
  });
};

// Project create form on GET.
exports.project_create_get = (req, res) => {
  res.render("project_form", { title: "Create Project" });
};

// Handle Project create on POST.
exports.project_create_post = [
  // Validate and sanitize the name field.
  body("name", "Project Name required").trim().isLength({ min: 1 }).escape(),
  //body("est_time", "Must be a number between 1 and 100").isInt({ min: 1, max: 100 }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a Project object with escaped and trimmed data.
    const project = new Project({ title: req.body.name, completed: false });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("project_form", {
        title: "Create Project",
        project,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Project with same name already exists.
      Project.findOne({ title: req.body.name }).exec((err, found_project) => {
        if (err) {
          return next(err);
        }

        if (found_project) {
          // Project exists, redirect to its detail page.
          res.redirect(found_project.url);
        } else {
          project.save((err) => {
            if (err) {
              return next(err);
            }
            // Project saved. Add to "default" user ---> todo: User functionality deferred
            User.findOne({ name: "default" }).exec((err, user) => {
              if (err) {
                return next(err);
              }
              if (user) {
                console.log("test");
                user.projects.push(project._id);
                user.save((err) => {
                  if (err) {
                    return next(err);
                  }
                  // Redirect to genre detail page.
                  res.redirect(project.url);
                });
              } else {
                //no user found, saving project without user. This path should not really occur.
                res.redirect(project.url);
              }
            });
          });
        }
      });
    }
  },
];

// Display Project delete form on GET.
exports.project_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Project delete GET");
};

// Handle Project delete on POST.
exports.project_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Project delete POST");
};

// Display Project update form on GET.
exports.project_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Project update GET");
};

// Handle Project update on POST.
exports.project_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Project update POST");
};
