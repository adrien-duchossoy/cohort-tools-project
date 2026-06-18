const express = require("express")
const router = express.Router()

// returns all the cohorts in JSON format

//CRUD operations

router.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    console.error("Error getting cohorts:", err);
    res.status(500).json({ message: "Error getting cohorts" });
  }
});



// Creates a new cohort
router.post("/api/cohorts", async (req, res) => {
  try {
    const createdCohort = {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
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
    res.status(500).json({ message: "Error creating cohort" });
  }
});

// Returns the specified cohort by id
router.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);

    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(cohort);
  } catch (err) {
    console.error("Error getting cohort:", err);
    res.status(500).json({ message: "Error getting cohort" });
  }
});

// Updates the specified cohort by id
router.put("/api/cohorts/:cohortId", async (req, res) => {
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
    res.status(500).json({ message: "Error updating cohort" });
  }
});

// Deletes the specified cohort by id
router.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);

    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json({ message: "Cohort deleted successfully" });
  } catch (err) {
    console.error("Error deleting cohort:", err);
    res.status(500).json({ message: "Error deleting cohort" });
  }
});



module.exports = router