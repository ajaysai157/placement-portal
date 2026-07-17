import express from "express";
import { createJob,getAllJobs,getJobById } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get('/:id',getJobById);
router.post('/',authMiddleware,authorizeRoles("recruiter"),createJob);

export default router;