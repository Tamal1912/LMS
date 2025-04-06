import express from "express";
import { createCourse, deleteCourse, updateCourse, getTeacherCourses } from "../controllers/course.controller.js";
import { trackAllStudents, getTeacherProfile, getStudentDetails, updateTeacherProfile } from "../controllers/teacherController.js";
import { createPost, deletePost,updatePost,getTeacherPosts } from "../controllers/postController.js";
import { checkRole } from '../middleware/protected.middlewar.js';
import { auth } from '../middleware/authMiddleware.js';
import { requireTeacher } from "../middleware/authMiddleware.js"
const router = express.Router();

// Course management routes
router.post("/create_course", auth, requireTeacher, checkRole(["teacher"]), createCourse);
router.delete("/delete_course/:courseId", auth, requireTeacher, checkRole(["teacher"]), deleteCourse);
router.put("/update_course/:courseId", auth, requireTeacher, checkRole(["teacher"]), updateCourse);
router.get("/courses", auth, requireTeacher, checkRole(["teacher"]), getTeacherCourses);
// Teacher routes
router.get("/track_all_students/", auth, requireTeacher, checkRole(["teacher"]), trackAllStudents);
router.get("/get_teacher_profile", auth, requireTeacher, checkRole(["teacher"]), getTeacherProfile);
router.get("/getStudentDetails/:id", auth, checkRole(["teacher"]), getStudentDetails);
router.put("/update_teacher_profile", auth, checkRole(["teacher"]), updateTeacherProfile);
//router.get("/enrolledStudents/:courseId", auth, requireTeacher, checkRole(["teacher"]), getEnrolledStudents);

//Post routes
router.post("/create_post", auth, requireTeacher, checkRole(["teacher"]), createPost);
router.get("/get_teacher_posts", auth, requireTeacher, checkRole(["teacher"]), getTeacherPosts);
router.delete("/delete_post/:postId", auth, checkRole(["teacher"]), deletePost);
router.put("/update_post/:postId", auth, requireTeacher, checkRole(["teacher"]), updatePost);
// router.get("/get_post/:postId", auth, requireTeacher, checkRole(["teacher"]), getPost);

export default router;
