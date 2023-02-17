const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeLogSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    default: null,
  },
  startTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  duration: {
    type: Number,
    default: 1,
    required: true,
  },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("TimeLog", timeLogSchema);
