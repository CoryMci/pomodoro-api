const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: false,
    default: null,
  },
  created: { type: Date, default: Date.now },
  due_date: { type: Date, default: null },
  completed: { type: Boolean, default: false, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  timeSpent: { type: Number, default: 0 },
  estimatedTime: { type: Number, default: null },
});

TaskSchema.virtual("url").get(function () {
  return `api/task/${this.id}`;
});

module.exports = mongoose.model("Task", TaskSchema);
