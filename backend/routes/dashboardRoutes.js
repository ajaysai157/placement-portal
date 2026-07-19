import express from "express";
import { studentDashboard, recruiterDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get(
    "/student",
    authMiddleware,
    studentDashboard
);

router.get(
    "/recruiter",
    authMiddleware,
    authorizeRoles("recruiter"),
    recruiterDashboard
);

export default router;