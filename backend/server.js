import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js"
import profileRoutes from "./routes/profileRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes)
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Placement Portal API Running 🚀",
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});