const { truncate } = require("fs/promises");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimesheetSchema = new Schema({
  empId: {
    type: String,
    required: true,
  },
  month: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  activities: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("timesheet", TimesheetSchema);
