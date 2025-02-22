import express from "express";
import { studentSignUp, teacherSignUp, studentLogin, teacherLogin, logout } from '../controllers/authController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post("/student/signup", studentSignUp);
router.post("/teacher/signup", teacherSignUp);
router.post("/student/login", studentLogin);
router.post("/teacher/login", teacherLogin);
router.post("/logout", auth, logout);

export default router;
