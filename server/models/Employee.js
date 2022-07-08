const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  uploded: {
    type: String,
  },
  filename: {
    type: String,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("employees", EmployeeSchema);
