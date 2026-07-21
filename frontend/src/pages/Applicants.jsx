import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getJobApplications } from "../services/applicationService";

import ApplicantList from "../components/applicants/ApplicantList";
import ApplicantDetails from "../components/applicants/ApplicantDetails";

import "./Applicants.css";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await getJobApplications(jobId);

      const validApplications = response.applications.filter(
        (application) => application.student,
      );

      setApplications(validApplications);

      if (validApplications.length > 0) {
        const updatedSelected =
          validApplications.find((app) => app._id === selectedApplicant?._id) ||
          validApplications[0];

        setSelectedApplicant(updatedSelected);
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="applicants-page">
      {applications.length > 0 && (
        <div className="page-header">
          <h1>{applications[0].job.title}</h1>
          <p>{applications[0].job.company}</p>
        </div>
      )}

      <div className="applicants-layout">
        <ApplicantList
          applications={applications}
          selectedApplicant={selectedApplicant}
          setSelectedApplicant={setSelectedApplicant}
        />

        <ApplicantDetails
          applicant={selectedApplicant}
          refreshApplications={fetchApplications}
        />
      </div>
    </section>
  );
}

export default Applicants;
