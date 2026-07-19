import Job from "../models/Job.js";
import Application from "../models/Application.js"
import asyncHandler from "../utils/asyncHandler.js";

export const studentDashboard = asyncHandler(async (req,res) => {

    const applications = await Application.find({
        student:req.user.userId,
    });

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        app => app.status === "Pending",
    );

    const pendingCount = pendingApplications.length;

    const acceptedApplications = applications.filter(
        app => app.status === "Accepted",
    );

    const acceptedCount = acceptedApplications.length;

    const rejectedApplications = applications.filter(
        app => app.status === "Rejected",
    );

    const rejectedCount = rejectedApplications.length;

    return res.status(200).json({
        success: true,
        dashboard: {
            totalApplications,
            pendingCount,
            acceptedCount,
            rejectedCount,
        },
    });

})


export const recruiterDashboard = asyncHandler(async (req, res) => {

    const jobs = await Job.find({
        createdBy: req.user.userId,
    });

    const totalJobs = jobs.length;

    const jobIds = jobs.map( job => job._id );

    const applications = await Application.find({
        job: {
            $in: jobIds,
        },
    });
    const totalApplications = applications.length;

    const pendingCount = applications.filter(
        app => app.status === "Pending"
    ).length;

    const acceptedCount = applications.filter(
        app => app.status === "Accepted"
    ).length;

    const rejectedCount = applications.filter(
        app => app.status === "Rejected"
    ).length;

    return res.status(200).json({
        success: true,
        dashboard: {
            totalJobs,
            totalApplications,
            pendingCount,
            acceptedCount,
            rejectedCount,
        },
    });
});