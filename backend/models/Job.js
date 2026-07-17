import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    jobType: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time"],
      default: "Full-time",
    },

    experience: {
      type: String,
      default: "Fresher",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;