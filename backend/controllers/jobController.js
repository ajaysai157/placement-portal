import Job from "../models/Job.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../errors/ApiError.js";
import getAuthorizedJob from "../utils/jobHelper.js"

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

    const { keyword, location, jobType, experience } = req.query;

    const query = {};
    if (location) {
        query.location = location;
    }
    if (jobType) {
        query.jobType = jobType;
    }
    if (experience) {
        query.experience = experience;
    }

    if (keyword) {
        query.$or = [
            {
                title: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                company: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                skills: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ];
    }

    const jobs = await Job.find(query);

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

export const getMyJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find({
        createdBy: req.user.userId,
    });

    return res.status(200).json({
        success: true,
        count: jobs.length,
        jobs,
    });

});

export const updateJob = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    const {
        title,
        company,
        location,
        description,
        salary,
        skills,
        jobType,
        experience,
    } = req.body;

    await getAuthorizedJob(id, req.user.userId);

    const updatedJob = await Job.findByIdAndUpdate(
        id,
        {
            title,
            company,
            location,
            description,
            salary,
            skills,
            jobType,
            experience,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return res.status(200).json({
        success: true,
        message: "Job updated successfully",
        job: updatedJob,
    });

})

export const deleteJob = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    await getAuthorizedJob(id, req.user.userId);
    
    await job.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Job deleted successfully",
    });
})