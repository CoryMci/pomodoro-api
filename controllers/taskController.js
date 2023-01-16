const Task = require("../models/task");

// Display list of all Tasks.
exports.task_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Task list");
};

// detail page for a specific task.
exports.task_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: task detail: ${req.params.id}`);
};

// task create form on GET.
exports.task_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: task create GET");
};

// Handle task create on POST.
exports.task_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: task create POST");
};

// Display task delete form on GET.
exports.task_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: task delete GET");
};

// Handle task delete on POST.
exports.task_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: task delete POST");
};

// Display task update form on GET.
exports.task_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: task update GET");
};

// Handle task update on POST.
exports.task_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: task update POST");
};
