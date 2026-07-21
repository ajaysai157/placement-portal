import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

import users from "./users.js";
import jobs from "./jobs.js";
import applications from "./applications.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Cleaning Database...");

    await Application.deleteMany();

    await Job.deleteMany();

    await User.deleteMany();

    console.log("Database Cleaned");

    console.log("Creating Users...");

    const insertedUsers = [];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        10
      );

      const createdUser = await User.create({
        ...user,
        password: hashedPassword,
      });

      insertedUsers.push(createdUser);
    }

    console.log(
      `${insertedUsers.length} Users Inserted`
    );
        console.log("Creating Jobs...");

    const recruiterMap = {};

    insertedUsers.forEach((user) => {
      if (user.role === "recruiter") {
        recruiterMap[user.email] = user._id;
      }
    });

    const insertedJobs = [];

    for (const job of jobs) {
      const recruiterId =
        recruiterMap[job.recruiterEmail];

      if (!recruiterId) {
        console.log(
          `Recruiter not found: ${job.recruiterEmail}`
        );

        continue;
      }

      const createdJob = await Job.create({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        salary: job.salary,
        skills: job.skills,
        jobType: job.jobType,
        experience: job.experience,
        createdBy: recruiterId,
      });

      insertedJobs.push(createdJob);
    }

    console.log(
      `${insertedJobs.length} Jobs Inserted`
    );

    const studentMap = {};

    insertedUsers.forEach((user) => {
      if (user.role === "student") {
        studentMap[user.email] = user._id;
      }
    });

    const jobMap = {};

    insertedJobs.forEach((job) => {
      jobMap[
        `${job.title}-${job.company}`
      ] = job._id;
    });

    console.log("Creating Applications...");
        let insertedApplications = 0;

    for (const application of applications) {
      const studentId =
        studentMap[application.studentEmail];

      const jobId =
        jobMap[
          `${application.jobTitle}-${application.company}`
        ];

      if (!studentId || !jobId) {
        console.log(
          `Skipping Application -> ${application.studentEmail}`
        );

        continue;
      }

      await Application.create({
        student: studentId,
        job: jobId,
        status: application.status,
      });

      insertedApplications++;
    }

    console.log(
      `${insertedApplications} Applications Inserted`
    );

    console.log("\n=================================");
    console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
    console.log("=================================");
    console.log(`👨‍🎓 Users        : ${insertedUsers.length}`);
    console.log(`💼 Jobs         : ${insertedJobs.length}`);
    console.log(`📄 Applications : ${insertedApplications}`);
    console.log("=================================\n");

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

};

seedDatabase();