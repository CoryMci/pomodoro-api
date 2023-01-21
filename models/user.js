const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/catalog/user/${this.username}`;
});

module.exports = mongoose.model("User", UserSchema);
