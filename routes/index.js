const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const task_controller = require("../controllers/taskController");
const project_controller = require("../controllers/projectController");
const auth_controller = require("../controllers/authController");

/// USER ROUTES ///

// GET home page.
router.get("/", (req, res) => res.redirect("/login"));

// GET login page
router.get("/login", auth_controller.login_get);

// POST request for logging in
router.post("/login", auth_controller.login_post);

//Response for successful login
router.get("/login-success", auth_controller.login_success);

//Response for failed login
router.get("/auth-failure", auth_controller.auth_failure);

// GET logout page - visitng this route logs the user out
router.get("/logout", auth_controller.logout_get);

//GET register page
router.get("/register", auth_controller.register_get);

// POST request for creating user.
router.post("/register", auth_controller.register_post);

module.exports = router;
