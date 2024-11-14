const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Teacher = require('../models/Teacher');

const router = express.Router();

router.get('/dashboard', authMiddleware('teacher'), async (req, res) => {
  const teacherData = await Teacher.findOne({ userId: req.user.id }).populate('students');
  res.json({ data: teacherData });
});

module.exports = router;
