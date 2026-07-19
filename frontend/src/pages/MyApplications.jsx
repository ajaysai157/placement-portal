import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

import "./MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications();

        setApplications(response.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="my-applications">
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <h3>You haven't applied to any jobs yet.</h3>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            className="application-card"
          >
            <h2>{application.job.title}</h2>

            <p>
              <strong>Company:</strong> {application.job.company}
            </p>

            <p>
              <strong>Location:</strong> {application.job.location}
            </p>

            <p>
              <strong>Salary:</strong> ₹{application.job.salary}
            </p>

            <p>
              <strong>Status:</strong> {application.status}
            </p>
          </div>
        ))
      )}
    </section>
  );
}

export default MyApplications;