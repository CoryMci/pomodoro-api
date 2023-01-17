const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const task_controller = require("../controllers/taskController");
const project_controller = require("../controllers/projectController");

/// USER ROUTES ///

// GET catalog home page.
router.get("/", user_controller.index);

// GET request for creating a User. NOTE This must come before routes that display user (uses id).
router.get("/user/create", user_controller.user_create_get);

// POST request for creating user.
router.post("/user/create", user_controller.user_create_post);

// GET request to delete user.
// router.get("/user/:id/delete", user_controller.user_delete_get);

// POST request to delete user.
// router.post("/user/:id/delete", user_controller.user_delete_post);

// GET request to update user.
// router.get("/user/:id/update", user_controller.user_update_get);

// GET request for one User.
router.get("/user/:id", user_controller.user_detail);

// POST request to update user.
// router.post("/user/:id/update", user_controller.user_update_post);

/// PROJECT ROUTES ///

// GET request for creating project. NOTE This must come before route for id (i.e. display project).
router.get("/project/create", project_controller.project_create_get);

// POST request for creating project.
router.post("/project/create", project_controller.project_create_post);

// GET request to delete project.
router.get("/project/:id/delete", project_controller.project_delete_get);

// POST request to delete project.
router.post("/project/:id/delete", project_controller.project_delete_post);

// GET request to update project.
router.get("/project/:id/update", project_controller.project_update_get);

// POST request to update project.
router.post("/project/:id/update", project_controller.project_update_post);

// GET request for one project.
router.get("/project/:id", project_controller.project_detail);

// GET request for list of all projects.
router.get("/projects", project_controller.project_list);

/// TASK ROUTES ///

// GET request for creating a task. NOTE This must come before route that displays task (uses id).
router.get("/task/create", task_controller.task_create_get);

//POST request for creating task.
router.post("/task/create", task_controller.task_create_post);

// GET request to delete task.
router.get("/task/:id/delete", task_controller.task_delete_get);

// POST request to delete task.
router.post("/task/:id/delete", task_controller.task_delete_post);

// GET request to update task.
router.get("/task/:id/update", task_controller.task_update_get);

// POST request to update task.
router.post("/task/:id/update", task_controller.task_update_post);

// GET request for one task.
router.get("/task/:id", task_controller.task_detail);

// GET request for list of all task.
router.get("/tasks", task_controller.task_list);

module.exports = router;
