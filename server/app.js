require("dotenv").config();

const PORT = process.env.PORT

const express = require("express");


const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


//connection to the DB
require("./db");

const config= require("./config")
config(app)



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


const router = require("./routes/index.routes")
app.use("/", router)



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
