let mongoose = require("mongoose");
const multer = require("multer");
const express = require("express");
const fs = require("fs");
const employeeRouter = express.Router();
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const Employees = require("../models/Employee");

//Method to check the file type to be uploaded. Can only upload pdf,doc or docx
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Set storage for the file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage, fileFilter });

//Method to get all the employees from DB
employeeRouter.get("/getAll", (req, res) => {
  Employees.find({}).exec(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({
        msgBody: "Could not fetch all the employee data",
      });
    } else {
      res.status(200).json({ employees: data });
    }
  });
});

//Method to get one employee from DB
employeeRouter.get("/:id", (req, res) => {
  Employees.findOne({ _id: ObjectId(req.params.id) }, (err, employee) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        msgBody: "Could not fetch the employee data for id:" + req.params.id,
      });
    } else {
      res.status(200).json({ employee: employee });
    }
  });
});

//Method to upload file DB
employeeRouter.put("/uploadFile/:id", upload.single("file"), (req, res) => {
  console.log(JSON.stringify(req.file));
  var doc = fs.readFileSync(req.file.path);
  var encode_doc = doc.toString("base64");
  var final_doc = {
    contentType: req.file.mimetype,
    file: new Buffer(encode_doc, "base64"),
  };
  Employee.findByIdAndUpdate(req.params.id, { file: final_doc }, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        msgBody: "Could not upload the file",
      });
    } else {
      res.status(200).json({ message: "File uploaded successfully" });
    }
  });
});

//Method to delete file DB
employeeRouter.post("/deleteFile", (req, res) => {
  Employee.findByIdAndUpdate(req.user._id, { file: "" }, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        msgBody: "Could not delete the file",
      });
    } else {
      res.status(200).json({ message: "File deleted successfully" });
    }
  });
});

module.exports = employeeRouter;
