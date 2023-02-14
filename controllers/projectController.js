const Project = require("../models/project");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const async = require("async");
const { exists } = require("../models/user");

exports.getProject = async function (req, res, next) {
  // must be used with isAuth middleware
  let project;
  try {
    project = await Project.findOne({ _id: req.params.id, user: req.user.id });
    if (project == null) {
      return res.status(400).json({ message: "Cannot find project" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.project = project;
  next();
};

// Display list of all Projects.
exports.project_list = function (req, res, next) {
  Project.find({ user: req.user._id }).exec(function (err, list_projects) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.json({ project_list: list_projects });
  });
};

// detail page for a specific Project.
exports.project_detail = (req, res) => {
  res.json(res.project);
};

// Project create form on GET.
exports.project_create_get = (req, res) => {
  res.render("project_form", { title: "Create Project" });
};

// Handle Project create on POST.
exports.project_create_post = [
  body("title", "Project Title must be between 3 and 50 characters")
    .trim()
    .isLength({ min: 3, max: 50 }),
  body("description")
    .optional()
    .isLength({ max: 250 })
    .withMessage("Description must be less than 250 characters"),
  body("estimatedTime")
    .optional()
    .isNumeric({ min: 1, max: 100 })
    .withMessage("Estimated Time should be a number between 1 and 100"),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (req.body.description === undefined) {
      req.body.description = "";
    }

    if (req.body.estimatedTime === undefined) {
      req.body.estimatedTime = 1;
    }
    // Create a Project object with escaped and trimmed data.
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      estimatedTime: req.body.estimatedTime,
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("project_form", {
        title: "Create Project",
        errors: errors.array(),
      });
      return;
    } else {
      console.log(req.user.id);
      // Data from form is valid.
      // Check if Project with same name already exists.
      Project.findOne({
        title: req.body.title,
        user: req.user.id,
      }).exec((err, found_project) => {
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
            res.status(201).json({ message: "sucess!" });
          });
        }
      });
    }
  },
];

// Delete project on DELETE.
exports.project_delete = async function (req, res) {
  try {
    await res.project.remove();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Handle Project update on PUT.
exports.project_update_put = [
  // Validate and sanitize the name field.
  body("title", "Project Title must be between 3 and 50 characters")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 }),
  body("description")
    .optional()
    .isLength({ max: 250 })
    .withMessage("Description must be less than 250 characters"),
  body("timeSpent")
    .optional()
    .isNumeric({ min: 1, max: 100 })
    .withMessage("Time Spent should be a number between 1 and 100"),
  body("estimatedTime")
    .optional()
    .isNumeric({ min: 1, max: 100 })
    .withMessage("Estimated Time should be a number between 1 and 100"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed paramater should be boolean"),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Send 422
      return res.status(422).json({ errors: errors.array() });
    } else {
      // Data from form is valid.
      // if req.body fields are undefined, leave it as is.
      res.project.title = req.body.title || res.project.title;
      res.project.description = req.body.description || res.project.description;
      res.project.timeSpent = req.body.timeSpent || res.project.timeSpent;
      res.project.estimatedTime =
        req.body.estimatedTime || res.project.estimatedTime;
      res.project.completed = req.body.completed || res.project.completed;

      res.project.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({ message: "success" });
      });
    }
  },
];
