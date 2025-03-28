import express from "express";
import { auth,requireStudent } from "../middleware/authMiddleware.js";
import { watchCourse } from "../controllers/course.controller.js";


const router=express.Router();



router.post("/watch/:courseId",auth,requireStudent,watchCourse)

export default router;
