import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../errors/ApiError.js";

export const createJob = asyncHandler(async (req,res)=>{
    const {
        title,
        company,
        location,
        description,
        salary,
        skills,
        jobType,
        experience,
    } =req.body;

    if(!title || !company || !location || !description || !salary){
        throw new ApiError(400, "Please fill all required fields");
    }

    const job = await Job.create({
        title,
        company,
        location,
        description,
        salary,
        skills,
        jobType,
        experience,
        createdBy: req.user.userId,
    });

    return res.status(201).json({
        success: true,
        message: "Job created successfully",
        job,
    });
}
)

export const getAllJobs = asyncHandler(async (req,res) => {
    const jobs = await Job.find();

    return res.status(200).json({
        success:true,
        count:jobs.length,
        jobs,
    })
})
export const getJobById = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    const job = await Job.findById(id);
    if(!job){
        throw new ApiError(404, "job not found");
    }
    return res.status(200).json({
        success:true,
        job,
    });
});