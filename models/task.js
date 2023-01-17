const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  created: { type: Date, default: Date.now },
  due_date: { type: Date },
  completed: { type: Boolean, default: false, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  timeSpent: { type: Number },
  estimatedTime: { type: Number },
});

module.exports = mongoose.model("Task", TaskSchema);
