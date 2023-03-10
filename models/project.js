const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  created: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  timeSpent: { type: Number, default: 0 },
  estimatedTime: { type: Number },
  completed: { type: Boolean, default: false },
});

ProjectSchema.virtual("url").get(function () {
  return `/project/${this.id}`;
});

module.exports = mongoose.model("Project", ProjectSchema);
