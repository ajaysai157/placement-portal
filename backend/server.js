import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes)
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Placement Portal Backend is Running 🚀");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});