import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';


const app = express();
app.use(fileUpload());

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",

  credentials: true,
}));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
console.log("Credential routes loaded ✅");

import credentialRoutes from "./routes/credential.js"; // Import credential routes
import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacher.route.js";
import courseRoutes from "./routes/course.route.js";
import studentRoutes from "./routes/student.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Routes Declaration
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/admin", adminRoutes);


app.use("/api/v1/credentials", credentialRoutes);  

// Export the app object for server setup
export default app;
