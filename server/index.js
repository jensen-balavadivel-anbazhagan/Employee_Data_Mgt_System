const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dbHandler = require("./dbHandler");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

dbHandler.connect().then((value) => {
  console.log(value);
});

//Routes
const employeeRouter = require("./routes/Employee");
const timesheetRouter = require("./routes/Timesheet");
const clientsRouter = require("./routes/Clients");
app.use("/employee", employeeRouter);
app.use("/timesheet", timesheetRouter);
app.use("/clients", clientsRouter);

//set up static folder for rendering react app
app.use(express.static(path.join(__dirname, "client/build")));

/*Handle any requests that doesn't target root url
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});*/

app.listen(PORT, () => {
  console.log("server started on", PORT);
});
