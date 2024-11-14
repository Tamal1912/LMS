const express = require('express');
const cors = require('cors');
//const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const credentialRoutes = require('./routes/credential');
require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/credentials', credentialRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
