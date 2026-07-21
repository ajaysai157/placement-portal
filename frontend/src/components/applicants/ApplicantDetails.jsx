import { toast } from "react-toastify";
import { updateApplicationStatus } from "../../services/applicationService";

function ApplicantDetails({
  applicant,
  refreshApplications,
}) {
  if (!applicant) {
    return (
      <div className="applicant-details empty-details">
        <h2>Select an Applicant</h2>
        <p>Click any applicant from the left panel.</p>
      </div>
    );
  }

  const student = applicant.student;

  const handleStatus = async (status) => {
    try {
      const response = await updateApplicationStatus(
        applicant._id,
        status
      );

      toast.success(response.message);

      refreshApplications();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update application"
      );
    }
  };

  return (
    <div className="applicant-details">

      <div className="details-header">

        <img
          src={
            student.profile?.profilePicture?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.name
            )}`
          }
          alt={student.name}
          className="details-image"
        />

        <div>
          <h2>{student.name}</h2>

          <p>{student.email}</p>

          <span
            className={`status ${applicant.status.toLowerCase()}`}
          >
            {applicant.status}
          </span>
        </div>

      </div>

      <div className="details-grid">

        <div>
          <strong>College</strong>
          <p>
            {student.profile?.college ||
              "Not Provided"}
          </p>
        </div>

        <div>
          <strong>Branch</strong>
          <p>
            {student.profile?.branch ||
              "Not Provided"}
          </p>
        </div>

        <div>
          <strong>Graduation</strong>
          <p>
            {student.profile?.graduationYear ||
              "Not Provided"}
          </p>
        </div>

        <div>
          <strong>CGPA</strong>
          <p>
            {student.profile?.cgpa ||
              "Not Provided"}
          </p>
        </div>

      </div>

      <div className="skills-section">

        <h3>Skills</h3>

        <div className="skills">

          {student.profile?.skills?.length ? (
            student.profile.skills.map((skill) => (
              <span
                key={skill}
                className="skill-chip"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills added</p>
          )}

        </div>

      </div>

      <div className="links">

        {student.profile?.github && (
          <a
            href={student.profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}

        {student.profile?.linkedin && (
          <a
            href={student.profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        )}

        {student.profile?.resume?.url && (
          <a
            href={student.profile.resume.url}
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
        )}

      </div>

      <div className="buttons">

        <button
          disabled={
            applicant.status === "Accepted"
          }
          onClick={() =>
            handleStatus("Accepted")
          }
        >
          Accept
        </button>

        <button
          className="reject-btn"
          disabled={
            applicant.status === "Rejected"
          }
          onClick={() => {
            if (
              window.confirm(
                "Reject this application?"
              )
            ) {
              handleStatus("Rejected");
            }
          }}
        >
          Reject
        </button>

      </div>

    </div>
  );
}

export default ApplicantDetails;