

const mongoose = require("mongoose");

 
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));