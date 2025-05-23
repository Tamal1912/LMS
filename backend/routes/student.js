import express from 'express';
import { updateStudentProfile,getStudentProfile,getAllCourses,enrollInCourse} from '../controllers/studentController.js';
import { auth, requireStudent } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/protected.middlewar.js';
// import { enrollInCourse } from '../controllers/course.controller.js';
import { getAllPosts } from '../controllers/postController.js';
const router = express.Router();

router.post('/profile/:id',auth,checkRole(["student"]),requireStudent,getStudentProfile);
router.put('/updateProfile/:id',auth,checkRole(["student"]),requireStudent,updateStudentProfile);
router.get("/allCourses",auth,checkRole(["student"]),requireStudent,getAllCourses);

router.get("enroll/:courseId",auth,checkRole(["student"]),requireStudent,enrollInCourse);

//posts feed
router.get("/postfeed",auth,checkRole(["student"]),requireStudent,getAllPosts);

export default router;

