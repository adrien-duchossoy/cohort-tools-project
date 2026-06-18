require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5005;

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
    origin: [process.env.ORIGIN || 'http://localhost:5173'],
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


// returns all the cohorts in JSON format
app.get("/api/cohorts", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    next(err);
  }
});

// Creates a new cohort 
app.post("/api/cohorts", async (req, res, next) => {
  try {
    const createdCohort = await Cohort.create(req.body);
    res.status(201).json(createdCohort);
  } catch (err) {
    next(err);
  }
});

// Returns the specified cohort by id 
app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);

    if (!cohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      return next(error);
    }

    res.json(cohort);
  } catch (err) {
    next(err);
  }
});

// Updates the specified cohort by id
app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      return next(error);
    }

    res.json(updatedCohort);
  } catch (err) {
    next(err);
  }
});

// Deletes the specified cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);

    if (!deletedCohort) {
      const error = new Error("Cohort not found");
      error.status = 404;
      return next(error);
    }

    res.json({ message: "Cohort deleted successfully" });
  } catch (err) {
    next(err);
  }
});

//STUDENTS 

//Get all students
app.get("/api/students", (req, res) => {
  Student.find({}).populate("cohort")
    .then((students) => {
      console.log("Retrieved students", students)
      res.json(students)
    })
    .catch((error) => {
      console.error("Error with students:", error)
      res.status(500).json({ error: "Failed to retrieve students" })
    })
});

//Get student of a specific cohort id
app.get("/api/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId }).populate("cohort")
    .then((students) => {
      console.log("Retrieved student for cohort", students)
      res.json(students)
    })
    .catch((error) => {
      console.error("Error retrieving students from cohort", error)
      res.status(500).json({ error: "Failed to retrieve students from cohort" })
    })
})


//GET student by id
app.get("/api/students/:studentId", (req, res) => {
  Student.findById({ _id: req.params.studentId }).populate("cohort")
    .then((students) => {
      console.log("Retrieved students", students)
      res.json(students)
    })
    .catch((error) => {
      console.error("Error with students:", error)
      res.status(500).json({ error: "Failed to retrieve students" })
    })
});


//CREATE a new student
app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then(() => {
      res.status(201).json(student)
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
})


//Delete a student
app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((students) => {
      console.log("Student deleted")
      res.send("Student deleted")
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
})


// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err);

  let statusCode = err.status || 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid id format";
  }


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});