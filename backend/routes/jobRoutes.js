import express from "express";
import { createJob,getAllJobs,getJobById,updateJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get('/:id',getJobById);
router.post('/',authMiddleware,authorizeRoles("recruiter"),createJob);
router.put('/:id',authMiddleware,authorizeRoles("recruiter"),updateJob);

export default router;