import express from "express"
import { getProfile, updateProfile, uploadResume } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.post(
    "/upload-resume",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

export default router;