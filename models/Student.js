const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
    unique: true,
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
  },
  grade: {
    type: String,
    required: [true, "Please enter a grade"],
  },
  classes: {
    type: [String],
    required: [true, "Please enter classes"],
  },
});

module.exports = mongoose.model("Student", StudentSchema);
