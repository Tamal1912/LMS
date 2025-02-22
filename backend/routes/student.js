import express from 'express';
import { updateStudentProfile,getStudentProfile } from '../controllers/studentController.js';
import { auth, requireStudent } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/protected.middlewar.js';

const router = express.Router();

router.get('/profile/:id',auth,checkRole(["student"]),requireStudent,getStudentProfile);
router.put('/updateProfile/:id',auth,checkRole(["student"]),requireStudent,updateStudentProfile);

export default router;

