const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
const authRoutes = require("./routes/authRoutes.js");

// Routes Declaration
app.use("/api/v1/users", authRoutes);

// Export the app object for server setup
module.exports = { app };
