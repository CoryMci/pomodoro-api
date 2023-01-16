const Project = require("../models/project");

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
  res.send(`NOT IMPLEMENTED: Project detail: ${req.params.id}`);
};

// Project create form on GET.
exports.project_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Project create GET");
};

// Handle Project create on POST.
exports.project_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Project create POST");
};

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
