import express from "express";
import { studentSignUp, teacherSignUp, studentLogin, teacherLogin,logout} from '../controllers/authController.js';
const router = express.Router();

// Route definitions (don't repeat middleware here)
router.post("/student/signup", studentSignUp);
router.post("/teacher/signup", teacherSignUp);
router.post("/student/login", studentLogin);
router.post("/teacher/login", teacherLogin);
router.post("/logout",logout);

export default router;
