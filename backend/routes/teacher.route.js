import express from "express";
import { createCourse,deleteCourse,updateCourse,getAllCourse } from "../controllers/teacherController.js";

const router = express.Router();

// Course management routes
router.get("/create_course", createCourse);
router.delete("/delete_course/:courseId", deleteCourse);
router.put("/update_course/:courseId", updateCourse);
router.get("/get_all_course", getAllCourse);
export default router;

