const express = require('express');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Student Dashboard
router.get('/student/dashboard', authenticateJWT, authorizeRole('student'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Student Dashboard' });
});

// Teacher Dashboard
router.get('/teacher/dashboard', authenticateJWT, authorizeRole('teacher'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Teacher Dashboard' });
});

module.exports = router;
