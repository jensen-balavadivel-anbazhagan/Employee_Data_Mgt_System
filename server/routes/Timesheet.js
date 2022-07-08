let mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const timesheetRouter = express.Router();
const Timesheets = require("../models/Timesheet");
const { request } = require("http");

//Method to get all the timesheets for the employee id from DB
timesheetRouter.get("/getAll/:id", (req, res) => {
  Timesheets.find({ empId: req.params.id }).exec(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({
        msgBody:
          "Could not fetch all the timesheet data for the employee: " +
          req.params.id,
      });
    } else {
      res.status(200).json({ timesheets: data });
    }
  });
});

//Method to get the timesheet for the given id and month from DB
timesheetRouter.get("/getDataForMonth", (req, res) => {
  Timesheets.find({ empId: req.body.id, month: req.body.month }).exec(function (
    err,
    data
  ) {
    if (err) {
      console.log(err);
      res.status(500).json({
        msgBody:
          "Could not fetch all the timesheet data for the employee: " +
          req.body.id +
          " and month: " +
          req.body.month,
      });
    } else {
      res.status(200).json({ timesheets: data });
    }
  });
});

//Method to save timesheet for employee id
timesheetRouter.post("/saveTimesheetData", (req, res) => {
  var id = mongoose.Types.ObjectId(req.body.id);
  Timesheets.findOne({ _id: id }).exec(function (err, data) {
    if (err) {
      console.log("Error during getting employee data to save" + err);
      res.status(404).json({
        msgBody: "Could not save the Timesheet",
      });
    } else {
      if (data) {
        var updateCond = { _id: data._id };
        var updateData = {
          $set: {
            empId: req.body.timesheetData.empId,
            date: req.body.timesheetData.date,
            client: req.body.timesheetData.client,
            activities: req.body.timesheetData.activities,
            hour: req.body.timesheetData.hour,
            submitted: req.body.timesheetData.submitted,
          },
        };

        Timesheets.updateOne(updateCond, updateData, (err) => {
          if (err) {
            console.log("Error during save " + err);
            res.status(404).json({
              msgBody: "Could not save the Timesheet",
            });
          } else {
            res.status(200).json({ message: "Timesheet saved successfully" });
          }
        });
      } else {
        var insertVal = {
          empId: req.body.timesheetData.empId,
          date: req.body.timesheetData.date,
          client: req.body.timesheetData.client,
          activities: req.body.timesheetData.activities,
          hour: req.body.timesheetData.hour,
          submitted: req.body.timesheetData.submitted,
        };
        Timesheets.insertMany(insertVal, (err) => {
          if (err) {
            console.log("Error during save" + err);
            res.status(404).json({
              msgBody: "Could not save the Timesheet",
            });
          } else {
            res.status(200).json({ message: "Timesheet saved successfully" });
          }
        });
      }
    }
  });
});

//Method to submit the timesheet for the employee
timesheetRouter.post("/submitTimesheet", (req, res) => {
  var updateCond = { empId: req.body.id };
  Timesheets.updateMany(updateCond, { submitted: true }, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        msgBody: "Could not submit the timesheet",
      });
    } else {
      res.status(200).json({ message: "Timesheet submitted successfully" });
    }
  });
});

//Method to delete timesheet for employee id
timesheetRouter.post("/deleteTimesheetData", (req, res) => {
  var id = mongoose.Types.ObjectId(req.body.id);
  var deleteCond = { _id: id };
  Timesheets.deleteOne(deleteCond, (err) => {
    if (err) {
      console.log("Error during delete" + err);
      res.status(404).json({
        msgBody: "Could not delete the Timesheet",
      });
    } else {
      res.status(200).json({ message: "Timesheet deleted successfully" });
    }
  });
});

module.exports = timesheetRouter;
