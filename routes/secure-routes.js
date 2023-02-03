const express = require("express");
const router = express.Router();
// Require controller modules.
const user_controller = require("../controllers/userController");
const task_controller = require("../controllers/taskController");
const project_controller = require("../controllers/projectController");

// GET request for one User summary
router.get("/user/summary", user_controller.user_detail);

/// PROJECT ROUTES ///

// GET request for creating project. NOTE This must come before route for id (i.e. display project).
router.get("/project/create", project_controller.project_create_get);

// POST request for creating project.
router.post("/project/create", project_controller.project_create_post);

// DELETE request to delete project.
router.delete(
  "/project/:id",
  project_controller.getProject,
  project_controller.project_delete
);

// PUT request to update project.
router.put(
  "/project/:id",
  project_controller.getProject,
  project_controller.project_update_put
);

// GET request for one project.
router.get(
  "/project/:id",
  project_controller.getProject,
  project_controller.project_detail
);

// GET request for list of all projects.
router.get("/project", project_controller.project_list);

/// TASK ROUTES ///

// GET request for list of all tasks.
router.get("/task", task_controller.task_list);

//POST request for creating task.
router.post("/task", task_controller.task_create_post);

// DELETE request to delete task.
router.delete(
  "/task/:id/",
  task_controller.getTask,
  task_controller.task_delete
);

// PUT request to update task.
router.put(
  "/task/:id/",
  task_controller.getTask,
  task_controller.task_update_put
);

// GET request for one task.
router.get("/task/:id", task_controller.getTask, task_controller.task_detail);

module.exports = router;
