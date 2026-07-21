function ApplicantCard({
  applicant,
  selected,
  onSelect,
}) {
  const student = applicant.student;

  return (
    <div
      className={`applicant-card-small ${
        selected ? "active-card" : ""
      }`}
      onClick={() => onSelect(applicant)}
    >
      <img
        src={
          student.profile?.profilePicture?.url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            student.name
          )}`
        }
        alt={student.name}
      />

      <div>
        <h3>{student.name}</h3>

        <p>{student.profile?.branch || "Not Provided"}</p>

        <span className={`status ${applicant.status.toLowerCase()}`}>
          {applicant.status}
        </span>
      </div>
    </div>
  );
}

export default ApplicantCard;