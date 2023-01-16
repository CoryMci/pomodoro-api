const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  time_est: { type: Number, min: 0, default: 0, required: true },
  time_act: { type: Number, min: 0, default: 0, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
