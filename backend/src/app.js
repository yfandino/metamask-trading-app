"use strict";
const express = require("express");
const router = require("./controllers/index.router");

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.use(function(err, req, res, next) {
  console.error(JSON.stringify(err, null, 2));
  res.status(err.status || 500).json(err);
});

app.use("/api/v0", router);

module.exports = app;