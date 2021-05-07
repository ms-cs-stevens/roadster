const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
const mongoose = require("mongoose");

// enable cors to take in requests from client
app.use(cors());

app.use(express.json());

// Logging Middleware
app.use(async (req, res, next) => {
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl}`
  );
  next();
});

app.use("/", routes);

// done! we export it so we can start the site in start.js
module.exports = app;
