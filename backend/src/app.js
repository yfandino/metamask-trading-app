"use strict";
const express = require("express");
const router = require("./controllers/index.router");

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept," +
                                             " Authorization, x-auth-signature, x-auth-wallet");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use("/api/v0", router);

router.use(function(err, req, res, next) {
  console.error(JSON.stringify(err, null, 2));
  res.status(err.status || 500)
    .send({ message: err.message || "Internal Server Error" });
});

module.exports = app;