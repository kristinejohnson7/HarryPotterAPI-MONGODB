const express = require("express");
const router = express.Router();

const {
  getStudents,
  getClassesForStudent,
  createNewStudent,
  updateStudent,
  updateStudentClasses,
  deleteStudent,
  deleteClasses,
} = require("../controllers/students");

router.route("/").get(getStudents).post(createNewStudent);

router
  .route("/:id")
  .get(getClassesForStudent)
  .put(updateStudent)
  .delete(deleteStudent);

router.route("/classes/:id").put(updateStudentClasses).delete(deleteClasses);

module.exports = router;
