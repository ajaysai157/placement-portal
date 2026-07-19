import { useState } from "react";
import { toast } from "react-toastify";
import { uploadResume } from "../../services/profileService";

function ResumeSection({ profile, fetchProfile }) {
  const [selectedResume, setSelectedResume] = useState(null);

  const handleUpload = async () => {
    if (!selectedResume) {
      return toast.error("Please select a PDF file.");
    }

    try {
      const response = await uploadResume(selectedResume);

      toast.success(response.message);

      setSelectedResume(null);

      fetchProfile();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Resume upload failed."
      );
    }
  };

  return (
    <div className="profile-card">
      <h2>Resume</h2>

      {profile.profile.resume.url ? (
        <div className="resume-info">
          <a
            href={profile.profile.resume.url}
            target="_blank"
            rel="noreferrer"
            className="resume-link"
          >
            📄 View Resume
          </a>

          <p>Upload another PDF to replace the current resume.</p>
        </div>
      ) : (
        <p>No Resume Uploaded</p>
      )}

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;

          if (file.type !== "application/pdf") {
            return toast.error("Only PDF files are allowed.");
          }

          setSelectedResume(file);
        }}
      />

      <button
        onClick={handleUpload}
        disabled={!selectedResume}
      >
        {profile.profile.resume.url
          ? "Replace Resume"
          : "Upload Resume"}
      </button>
    </div>
  );
}

export default ResumeSection;