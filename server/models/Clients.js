const { truncate } = require("fs/promises");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("clients", clientsSchema);
