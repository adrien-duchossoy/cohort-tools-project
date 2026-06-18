const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


function config(app) {
  // MIDDLEWARE
  // Research Team - Set up CORS middleware here:

  // ...

  // Use the cors middleware without any options to allow
  // requests from any IP address and domain.
  // app.use(cors());

  // Use the CORS middleware with options to allow requests
  // from specific IP addresses and domains.

  app.use(
    cors({
      origin: process.env.ORIGIN,
    }),
  );

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
}


module.exports = config
