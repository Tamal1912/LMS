import express from 'express';
import { updateStudentProfile,getStudentProfile,getAllCourses} from '../controllers/studentController.js';
import { auth, requireStudent } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/protected.middlewar.js';
import { getAllPosts } from '../controllers/postController.js';
const router = express.Router();

router.post('/profile/:id',auth,checkRole(["student"]),requireStudent,getStudentProfile);
router.put('/updateProfile/:id',auth,checkRole(["student"]),requireStudent,updateStudentProfile);
router.get("/allCourses",auth,checkRole(["student"]),requireStudent,getAllCourses);

//posts feed
router.get("/postfeed",auth,checkRole(["student"]),requireStudent,getAllPosts);

export default router;

