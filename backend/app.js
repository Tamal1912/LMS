import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

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
import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacher.route.js";
import courseRoutes from "./routes/course.route.js";
// Routes Declaration
app.use("/api/v1/users", authRoutes);
// The issue is in how the middleware is chained. The async function is acting as middleware
// and not passing control to teacherRoutes. Here's the corrected version:
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/course", courseRoutes);

// Export the app object for server setup
export default app;
