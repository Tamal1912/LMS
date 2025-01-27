import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { watchCourse } from "../controllers/course.controller.js";


const router=express.Router();



router.post("/watch/:courseId",auth,watchCourse)

export default router;
