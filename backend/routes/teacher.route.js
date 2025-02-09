import express from "express";
import {createCourse,deleteCourse,updateCourse,getAllCourse} from "../controllers/course.controller.js";
import { trackAllStudents,getTeacherProfile,getStudentDetails } from "../controllers/teacherController.js";
import {  checkRole } from '../middleware/protected.middlewar.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

// Course management routes
router.post("/create_course", auth, checkRole(["teacher"]), createCourse);
router.delete("/delete_course/:courseId", auth, checkRole(["teacher"]), deleteCourse);
router.put("/update_course/:courseId", auth, checkRole(["teacher"]), updateCourse);
router.get("/get_all_course", auth, getAllCourse);
router.get("/track_all_students/", auth, trackAllStudents);
router.get("/get_teacher_profile", auth, getTeacherProfile);
router.get("/getStudentDetails/:id", auth, getStudentDetails);


export default router;

