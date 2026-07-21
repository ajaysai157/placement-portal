import ApplicantCard from "./ApplicantCard";

function ApplicantList({
  applications,
  selectedApplicant,
  setSelectedApplicant,
}) {
  return (
    <div className="applicant-list">

      <h2>Applicants</h2>

      {applications.map((application) => (
        <ApplicantCard
          key={application._id}
          applicant={application}
          selected={
            selectedApplicant?._id === application._id
          }
          onSelect={setSelectedApplicant}
        />
      ))}

    </div>
  );
}

export default ApplicantList;