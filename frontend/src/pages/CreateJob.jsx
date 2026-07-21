import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createJob } from "../services/jobService";

import "./CreateJob.css";

function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [experience, setExperience] = useState("Fresher");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createJob({
        title,
        company,
        location,
        salary: Number(salary),
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        jobType,
        experience,
        description,
      });

      toast.success(response.message);

      navigate("/recruiter/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create job"
      );
    }
  };

  return (
    <section className="create-job-page">

      <div className="form-container">

        <h1>Create New Job</h1>

        <p>
          Fill in the details below to publish a new opportunity.
        </p>

        <form
          className="job-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e)=>setCompany(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e)=>setSalary(e.target.value)}
              required
            />

            <select
              value={jobType}
              onChange={(e)=>setJobType(e.target.value)}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>

            <select
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
            >
              <option>Fresher</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3+ Years</option>
            </select>

          </div>

          <input
            type="text"
            placeholder="Skills (React, Node.js, MongoDB)"
            value={skills}
            onChange={(e)=>setSkills(e.target.value)}
          />

          <textarea
            rows="7"
            placeholder="Job Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <button type="submit">
            Publish Job
          </button>

        </form>

      </div>

    </section>
  );
}

export default CreateJob;