const User = require("../models/user");

// detail page for a specific user.
exports.user_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
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
