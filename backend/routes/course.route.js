import express from "express";
import {createCourse,getCourses,deleteCourse} from "../controllers/course.controller.js";

const router=express.Router();

router.post("/create_course",createCourse);
router.get("/get_courses",getCourses);
router.delete("/delete_course/:id",deleteCourse);

export default router;
