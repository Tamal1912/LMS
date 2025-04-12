// routes/admin.js
import express from 'express';
import {Admin} from '../models/Admin.model.js';
import { trackAllStudents } from '../controllers/adminController.js';



const router = express.Router();


router.post('/AdminLogin', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || admin.password !== password) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid email or password',
    });
  }

  // Later: Add JWT
  res.status(200).json(
    {
      code: 200,
      message: 'Login successful',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    }
  );
});

router.get('/trackAllStudents',trackAllStudents );

export default router;
