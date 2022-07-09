const Student = require("../models/Student");

// @desc    Get all students
// @route   GET /api/v1/students
// @access  PUBLIC
exports.getStudents = async (req, res, next) => {
  try {
    const { sort, limit } = req.query;
    sort === "desc" ? -1 : 1;
    let students = await Student.find().sort({ lastName: sort }).limit(limit);
    res
      .status(200)
      .json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get classes for single student
// @route   GET /api/v1/students/:id
// @access  PUBLIC
exports.getClassesForStudent = async (req, res, next) => {
  try {
    const classes = await Student.findById(req.params.id);
    if (!classes) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, studentClasses: classes.classes });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new student
// @route   POST /api/v1/students/
// @access  PRIVATE
exports.createNewStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update student
// @route   PUT /api/v1/students/:id
// @access  PRIVATE
exports.updateStudent = async (req, res, next) => {
  req.body.updatedOn = Date.now();
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update student class/classes
// @route   PUT /api/v1/students/classes/:id
// @access  PRIVATE
exports.updateStudentClasses = async (req, res, next) => {
  req.body.updatedOn = Date.now();
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { classes: { $each: req.body.classes } },
        updatedOn: req.body.updatedOn,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!student) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: student.classes });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete student
// @route   DELETE /api/v1/students/:id
// @access  PRIVATE
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete classes
// @route   DELETE /api/v1/students/classes/:id
// @access  PRIVATE
exports.deleteClasses = async (req, res, next) => {
  req.body.updatedOn = Date.now();
  console.log(req.body.classes);
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { classes: { $in: req.body.classes } },
        updatedOn: req.body.updatedOn,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!student) {
      res.status(400).json({ success: false });
    }
    res.status(200).send({ success: true, data: student.classes });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
