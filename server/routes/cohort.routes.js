const express = require("express")
const router = express.Router()
const Cohort = require("../models/Cohort.model")

// returns all the cohorts in JSON format

//CRUD operations

router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    console.error("Error getting cohorts info:", err);
    /* res.status(500).json({ message: "Error getting cohorts info" }); */
    next(err);
  }
});



// Creates a new cohort
router.post("/", async (req, res, next) => {
  try {
    const createdCohort = {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    };

    await Cohort.create(createdCohort);

    res.status(201).json(createdCohort);
  } catch (err) {
    console.error("Error creating cohort:", err);
    /* res.status(500).json({ message: "Error creating cohort" });*/
    next(err);
  }
});

// Returns the specified cohort by id
router.get("/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);

    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(cohort);
  } catch (err) {
    console.error("Error getting cohort:", err);
    /* res.status(500).json({ message: "Error getting cohort" }); */
    next(err);
  }
});

// Updates the specified cohort by id
router.put("/:cohortId", async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(updatedCohort);
  } catch (err) {
    console.error("Error updating cohort:", err);
    /* res.status(500).json({ message: "Error updating cohort" }); */
    next(err);
  }
});

// Deletes the specified cohort by id
router.delete("/:cohortId", async (req, res, next) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);

    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json({ message: "Cohort deleted successfully" });
  } catch (err) {
    console.error("Error deleting cohort:", err);
    /* res.status(500).json({ message: "Error deleting cohort" }); */
    next(err);
  }
});



module.exports = router