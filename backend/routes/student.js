import express from 'express';
import { updateStudentProfile } from '../controllers/studentController.js';


const router = express.Router();

router.put('/updateProfile/:id',updateStudentProfile);

export default router;
