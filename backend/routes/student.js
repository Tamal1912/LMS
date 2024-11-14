const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Student = require('../models/Student');

const router = express.Router();

router.get('/dashboard', authMiddleware('student'), async (req, res) => {
  const studentData = await Student.findOne({ userId: req.user.id });
  res.json({ data: studentData });
});

module.exports = router;
