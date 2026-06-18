const express = require("express")
const router = express.Router()
const Student = require("../models/Student.model")

//STUDENTS

//Get all students
router.get("/", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error with students:", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

//Get student of a specific cohort id
router.get("/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved student for cohort", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error retrieving students from cohort", error);
      res
        .status(500)
        .json({ error: "Failed to retrieve students from cohort" });
    });
});

//GET student by id
router.get("/:studentId", (req, res) => {
  Student.findById({ _id: req.params.studentId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error with students:", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

//CREATE a new student
router.post("/", (req, res) => {
  Student.create(req.body)
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

//Update a student
router.put("/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

//Delete a student
router.delete("/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((students) => {
      console.log("Student deleted");
      res.send("Student deleted");
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});





module.exports = router