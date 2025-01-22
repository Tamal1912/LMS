import express from "express";
import {router} from "../controllers/course.controller.js";

const router=express.Router();

router.post("/createCourse",createCourse);
router.get("/getCourses",getCourses);
router.delete("/deleteCourse/:id",deleteCourse);

export default router;
