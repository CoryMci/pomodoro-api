const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  completed: { type: Boolean, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
