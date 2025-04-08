import express from "express";
import { auth,requireStudent } from "../middleware/authMiddleware.js";
import { watchCourse, suggestedCourses } from "../controllers/course.controller.js";


const router=express.Router();



router.post("/watch/:courseId",auth,requireStudent,watchCourse)
router.get("/suggestedCourses",auth,requireStudent,suggestedCourses)
export default router;
