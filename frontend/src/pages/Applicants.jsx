import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getJobApplications,
  updateApplicationStatus,
} from "../services/applicationService";

import "./Applicants.css";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await getJobApplications(jobId);
      setApplications(response.applications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleStatus = async (id, status) => {
    try {
      const response = await updateApplicationStatus(id, status);

      toast.success(response.message);

      fetchApplications();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  const validApplications = applications.filter(
    (application) => application.student
  );

  return (
    <section className="applicants-page">
      <h1>Applicants</h1>

      {validApplications.length === 0 ? (
        <h3>No Applications Yet</h3>
      ) : (
        validApplications.map((application) => (
          <div
            key={application._id}
            className="application-card"
          >
            <h2>{application.student.name}</h2>

            <p>{application.student.email}</p>

            <p>
              Status: <strong>{application.status}</strong>
            </p>

            <div className="buttons">
              <button
                onClick={() =>
                  handleStatus(application._id, "Accepted")
                }
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleStatus(application._id, "Rejected")
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Applicants;