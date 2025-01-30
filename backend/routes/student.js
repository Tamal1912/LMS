import express from 'express';
import { updateStudentProfile,getStudentProfile } from '../controllers/studentController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile/:id',auth,getStudentProfile);
router.put('/updateProfile/:id',auth,updateStudentProfile);

export default router;

