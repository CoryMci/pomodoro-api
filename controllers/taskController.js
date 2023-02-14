const Task = require("../models/task");
const { body, validationResult } = require("express-validator");

exports.getTask = async function (req, res, next) {
  // must be used with isAuth middleware
  let task;
  try {
    task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (task == null) {
      return res.status(400).json({ message: "Cannot find task" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.task = task;
  next();
};

// Display list of all Tasks.
exports.task_list = function (req, res, next) {
  Task.find({ user: req.user._id }).exec(function (err, list_tasks) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.json({ task_list: list_tasks });
  });
};
// detail page for a specific task.
exports.task_detail = (req, res) => {
  res.json(res.task);
};

// task create form on GET.
exports.task_create_post = [
  function (req, res, next) {
    console.log(req.body);
    next();
  },
  body("title", "Task Title must be between 3 and 50 characters")
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
    console.log(req.body.project);
    // Create a Project object with escaped and trimmed data.
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      project: req.body.project,
      estimatedTime: req.body.estimatedTime,
      due_date: req.body.duedate,
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Send 422.
      return res.status(422).json({ errors: errors.array() });
    } else {
      console.log(req.user.id);
      // Data from form is valid.
      // Check if Project with same name already exists.
      Task.findOne({
        title: req.body.title,
        user: req.user.id,
      }).exec((err, found_task) => {
        if (err) {
          return next(err);
        }

        if (found_task) {
          res
            .status(303)
            .json({ message: "Task already exists with that name!" });
        } else {
          task.save((err) => {
            if (err) {
              return next(err);
            }
            res.status(201).json({ message: "success" });
          });
        }
      });
    }
  },
];

// Delete task on DELETE.
exports.task_delete = async function (req, res) {
  try {
    await res.task.remove();
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Handle task update on PUT.
exports.task_update_put = [
  // Validate and sanitize the name field.
  body("title", "Task Title must be between 3 and 50 characters")
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
  body("project")
    .optional()
    .isMongoId()
    .withMessage("Project must be a valid mongo ID"),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Send 422
      return res.status(422).json({ errors: errors.array() });
    } else {
      console.log(req.body.title);
      // Data from form is valid.
      // if req.body fields are undefined, leave it as is.
      res.task.title = req.body.title || res.task.title;
      res.task.description = req.body.description || res.task.description;
      res.task.timeSpent = req.body.timeSpent || res.task.timeSpent;
      res.task.estimatedTime = req.body.estimatedTime || res.task.estimatedTime;
      res.task.completed = req.body.completed || res.task.completed;
      res.task.project = req.body.project || res.task.project;

      res.task.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({ message: "success" });
      });
    }
  },
];
