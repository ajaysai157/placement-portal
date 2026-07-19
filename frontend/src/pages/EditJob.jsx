import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getJobById, updateJob } from "../services/jobService";
import { toast } from "react-toastify";
import "./CreateJob.css";

function EditJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [experience, setExperience] = useState("Fresher");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);

        const job = response.job;

        setTitle(job.title);
        setCompany(job.company);
        setLocation(job.location);
        setSalary(job.salary);
        setSkills(job.skills.join(", "));
        setJobType(job.jobType);
        setExperience(job.experience);
        setDescription(job.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateJob(id, {
        title,
        company,
        location,
        salary: Number(salary),
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        jobType,
        experience,
        description,
      });

      toast.success(response.message);

      navigate("/recruiter/jobs");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  return (
    <section className="create-job">
      <h1>Edit Job</h1>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option>Fresher</option>
          <option>1 Year</option>
          <option>2 Years</option>
          <option>3+ Years</option>
        </select>

        <textarea
          rows="6"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Update Job</button>
      </form>
    </section>
  );
}

export default EditJob;
