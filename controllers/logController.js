const TimeLog = require("../models/timeLog");
const { body, validationResult } = require("express-validator");

// log create on POST
exports.log_create_post = [
  body("task", "Invalid task Id").isMongoId().optional({ nullable: true }),
  body("completed").optional().isBoolean(),
  body("duration").optional().isNumeric({ min: 1 }),

  // Process request after validation
  (req, res, next) => {
    console.log(req.body.task, req.body.completed, req.body.duration);
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a TimeLog object with validated data
    const newEntry = new TimeLog({
      task: req.body.task || null,
      completed: req.body.completed || false,
      user: req.user._id,
      duration: req.body.duration || 1,
    });

    if (!errors.isEmpty()) {
      // There are errors. Send 422.
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    } else {
      // Data sent is valid
      // Save Entry in db, return ID in response
      newEntry.save((err, entry) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({ id: entry._id });
      });
    }
  },
];

// Handle log update on PUT.
exports.log_update_put = [
  // Validate and sanitize
  body("task", "Invalid task Id").isMongoId().optional({ nullable: true }),
  body("duration")
    .isNumeric({ min: 1 })
    .withMessage("Duration should be greater than 0"),
  body("completed")
    .isBoolean()
    .withMessage("Completed field should be boolean"),

  async function getLog(req, res, next) {
    try {
      log = await TimeLog.findOne({ _id: req.params.id, user: req.user.id });
      if (log == null) {
        return res.status(400).json({ message: "Cannot find log entry" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.log = log;
    next();
  },

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
      res.log.duration = req.body.duration || res.log.duration;
      res.log.completed = req.body.completed;
      res.log.task = req.body.task || null;

      res.log.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({ message: "success" });
      });
    }
  },
];

//logs GET
exports.log_get = async function (req, res, next) {
  try {
    log = await TimeLog.findOne({ _id: req.params.id, user: req.user.id });
    if (log == null) {
      return res.status(400).json({ message: "Cannot find log" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.status(201).json({ log: log });
};
