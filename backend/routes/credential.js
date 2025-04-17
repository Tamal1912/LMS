import express from 'express';
import { upload, verify } from '../controllers/credentialController.js';  
import { auth } from '../middleware/authMiddleware.js';  

const router = express.Router();


router.post('/upload',  upload);  

router.get('/verify/:studentId', verify);  // Apply auth middleware and then call verify function

export default router;
