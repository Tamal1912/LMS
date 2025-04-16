import express from 'express';
import { upload, verify } from '../controllers/credentialController.js';  // Correct import for functions

import { auth } from '../middleware/authMiddleware.js';  // Auth middleware

const router = express.Router();
/*
console.log("Credential router is alive ");
router.post('/upload', (req, res) => {
  console.log("Upload route hit ");
  res.send("We got you, king.");
  console.log(" req.body:", req.body);
});
*/

// POST /api/v1/credentials/upload - Upload a credential
router.post('/upload',  upload);  // Apply auth middleware and then call upload function

// GET /api/v1/credentials/verify/:studentId - Verify a credential
router.get('/verify/:studentId', auth, verify);  // Apply auth middleware and then call verify function

export default router;
