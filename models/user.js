const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

UserSchema.virtual("url").get(function () {
  return `/catalog/user/${this.name}`;
});

module.exports = mongoose.model("User", UserSchema);
