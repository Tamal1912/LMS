const express = require("express");
const { studentSignUp, teacherSignUp, studentLogin, teacherLogin,logout} = require('../controllers/authController');
const router = express.Router();

// Route definitions (don't repeat middleware here)
router.post("/student/signup", studentSignUp);
router.post("/teacher/signup", teacherSignUp);
router.post("/student/login", studentLogin);
router.post("/teacher/login", teacherLogin);
router.post("/logout",logout);

module.exports = router;
