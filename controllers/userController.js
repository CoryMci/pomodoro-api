const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/user");

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

// User create form -> deferred until we add new user option
// exports.user_create_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: User create GET");
// };

// // Handle User create on POST. -> deferred until we add new user option
// exports.user_create_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: User create POST");
// };

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
