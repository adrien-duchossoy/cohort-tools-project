const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
const PORT = 5005;

const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")


// setup CORS
const cors = require("cors");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


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
    origin: [
      'http://localhost:5005'
    ], // Add the URLs of allowed origins to this array
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts)=> {
      console.log("Retrieved cohorts", cohorts)
      res.json(cohorts)
    })
    .catch((error) => {
      console.error("Error with cohorts:", error)
      res.status(500).json({error: "Failed to retrieve cohorts"})
    })
});


app.get("/api/students", (req, res) => {
  res.sendFile(__dirname + "/data/students.json");
}); 


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});