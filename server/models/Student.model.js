const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  linkedinUrl: { type: String },
  languages: { type: [String] },
  program: { type: String },
  background: { type: String },
  image: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
});

module.exports = mongoose.model("Student", studentSchema);