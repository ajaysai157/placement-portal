import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js" 
const router = express.Router();
import authorizeRoles from "../middleware/authorizeRoles.js";

router.post("/register", registerUser);
router.post("/login",loginUser)

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your profile",
    user:req.user,
  });
});

router.get(
  "/recruiter-dashboard",
  authMiddleware,
  authorizeRoles("recruiter"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Recruiter",
    });
  }
);

export default router;