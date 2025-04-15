import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import credentialRoutes from "./routes/credential.js"; // Import credential routes

const app = express();

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",  // You can update this if you have different frontend URLs
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
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

// Add credential routes
app.use("/api/v1/credentials", credentialRoutes);  // Add the new routes

// Export the app object for server setup
export default app;
