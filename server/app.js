const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });

const mongoose = require("mongoose");

const configRoutes = require("./routes");

// Logging Middleware
app.use(async (req, res, next) => {
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl}`
  );
  next();
});

// allowing cors request because request originator would be react app
app.use(cors());

// We can allow cors for specific routes doing this
// app.use('/api/files/filter', cors(), async (req, res, next) => {
//   next();
// });

app.use("/", routes);
// done! we export it so we can start the site in start.js
module.exports = app;
