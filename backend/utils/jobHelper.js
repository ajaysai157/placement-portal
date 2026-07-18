import Job from "../models/Job.js";
import ApiError from "../errors/ApiError.js";

const getAuthorizedJob = async (jobId, userId) => {
    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }
    if (job.createdBy.toString() !== userId) {
        throw new ApiError(
            403,
            "You are not authorized to perform this action"
        );
    }
    return job;
};

export default getAuthorizedJob;