import express from "express";
import {enrollCourse,getEnrolledCourses} from "../controllers/course.controller.js";

const router=express.Router();



router.post("/enroll/:id",enrollCourse);
router.get("/enrolled_courses",getEnrolledCourses);

export default router;
