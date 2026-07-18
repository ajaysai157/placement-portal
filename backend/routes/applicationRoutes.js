import express from "express";
import {applyJob,getMyApplications,getAllApplications,updateApplicationStatus } from "../controllers/applicationController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router()

router.post('/apply/:jobId',authMiddleware,authorizeRoles("student"),applyJob);

router.get('/my',authMiddleware,authorizeRoles("student"),getMyApplications);

router.get('/job/:jobId',authMiddleware,authorizeRoles("recruiter"),getAllApplications);

router.patch('/:id/status',authMiddleware,authorizeRoles("recruiter"),updateApplicationStatus)

export default router;