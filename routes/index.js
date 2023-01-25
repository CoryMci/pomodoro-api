const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const task_controller = require("../controllers/taskController");
const project_controller = require("../controllers/projectController");
const auth_controller = require("../controllers/authController");

const isAuth = require("./authMiddleware").isAuth;

/// USER ROUTES ///

// GET home page.
router.get("/", user_controller.index);

// GET login page
router.get("/login", auth_controller.login_get);

// POST request for logging in
router.post("/login", auth_controller.login_post);

// GET logout page - visitng this route logs the user out
router.get("/logout", auth_controller.logout_get);

//GET register page
router.get("/register", auth_controller.register_get);

// POST request for creating user.
router.post("/register", auth_controller.register_post);

// GET request for one User summary
router.get("/user/summary", isAuth, user_controller.user_detail);

/// PROJECT ROUTES ///

// GET request for creating project. NOTE This must come before route for id (i.e. display project).
router.get("/project/create", isAuth, project_controller.project_create_get);

// POST request for creating project.
router.post("/project/create", isAuth, project_controller.project_create_post);

// DELETE request to delete project.
router.delete(
  "/project/:id",
  isAuth,
  project_controller.getProject,
  project_controller.project_delete
);

// PUT request to update project.
router.put(
  "/project/:id",
  isAuth,
  project_controller.getProject,
  project_controller.project_update_put
);

// GET request for one project.
router.get(
  "/project/:id",
  isAuth,
  project_controller.getProject,
  project_controller.project_detail
);

// GET request for list of all projects.
router.get("/project", isAuth, project_controller.project_list);

/// TASK ROUTES ///

// GET request for list of all tasks.
router.get("/task", isAuth, task_controller.task_list);

//POST request for creating task.
router.post("/task", isAuth, task_controller.task_create_post);

// DELETE request to delete task.
router.delete(
  "/task/:id/",
  isAuth,
  task_controller.getTask,
  task_controller.task_delete
);

// PUT request to update task.
router.put(
  "/task/:id/",
  isAuth,
  task_controller.getTask,
  task_controller.task_update_put
);

// GET request for one task.
router.get(
  "/task/:id",
  isAuth,
  task_controller.getTask,
  task_controller.task_detail
);

module.exports = router;
