import express from 'express';
import { upload, verify } from '../controllers/credentialController.js';  // Correct import for functions

import { auth } from '../middleware/authMiddleware.js';  // Auth middleware

const router = express.Router();

// POST /api/v1/credentials/upload - Upload a credential
router.post('/upload', auth, upload);  // Apply auth middleware and then call upload function

// GET /api/v1/credentials/verify/:studentId - Verify a credential
router.get('/verify/:studentId', auth, verify);  // Apply auth middleware and then call verify function

export default router;
