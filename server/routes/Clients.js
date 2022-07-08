let mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const clientsRouter = express.Router();
const Clients = require("../models/Clients");
const { request } = require("http");

clientsRouter.get("/getAll", (req, res) => {
  Clients.find().exec(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({
        msgBody: "Could not fetch all the clients",
      });
    } else {
      res.status(200).json({ clients: data });
    }
  });
});

module.exports = clientsRouter;
