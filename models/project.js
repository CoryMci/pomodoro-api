const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  completed: { type: Boolean, required: true },
});

module.exports = mongoose.model("Project", ProjectSchema);
