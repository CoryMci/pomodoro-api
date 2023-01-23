const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  created: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  timeSpent: { type: Number },
  estimatedTime: { type: Number },
  completed: { type: Boolean, required: true },
});

ProjectSchema.virtual("url").get(function () {
  return `/project/${this.id}`;
});

module.exports = mongoose.model("Project", ProjectSchema);
