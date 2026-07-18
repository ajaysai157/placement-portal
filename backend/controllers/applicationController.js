import Application from "../models/Application.js"
import Job from "../models/Job.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../errors/ApiError.js"

export const applyJob = asyncHandler(async (req,res) =>{
    const { jobId } = req.params;

    const studentId = req.user.userId;

    const job = await Job.findById(jobId);
    if(!job){
        throw new ApiError(404,"Job not found");
    }

    const existingApplication = await Application.findOne({
        student:studentId,
        job:jobId,
    })

    if(existingApplication){
        throw new ApiError(400,"You have already applied for this job");
    }
    const application = await Application.create({
        student:studentId,
        job:jobId,
    })

    return res.status(201).json({
        success:true,
        message:"Application submitted successfully",
        application
    })
})

export const getMyApplications = asyncHandler(async (req,res) => {
    const applications = await Application.find({
        student:req.user.userId
    }).populate(
        "job",
        "title company location salary jobType experience"
    )
    
    return res.status(200).json({
        success:true,
        count:applications.length,
        applications
    })
})

export const getAllApplications = asyncHandler(async (req,res) => {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if(!job){
        throw new ApiError(404,"Job not found");
    }

    if(job.createdBy.toString() !== req.user.userId){
        throw new ApiError(403,"non authorized");
    }
    const applications = await Application.find({
        job:jobId,
    }).populate("student", "name email role");

    return res.status(200).json({
        success:true,
        count:applications.length,
        applications
    })
})

export const updateApplicationStatus = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);

    if(!application){
        throw new ApiError(404,"Application Not Found");
    }

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const job = await Job.findById(application.job);

    if(job.createdBy.toString() !== req.user.userId){
        throw new ApiError(403,"Not Authorized");
    }

    application.status=status;
    await application.save();

    return res.status(200).json({
        success: true,
        message: "Application status updated",
        application,
    })
})