const mongoose = require("mongoose");
const mongooseOpts = require("./mongooseOpts");

module.exports.connect = async () => {
  let uri =
    process.env.DB_URI || "mongodb://localhost:27017/tecMaster-payroll-db";
  let returnValue = `connected to mongodb-server at: ${uri}`;
  await mongoose.connect(uri, mongooseOpts.getValue());
  return Promise.resolve(returnValue);
};
