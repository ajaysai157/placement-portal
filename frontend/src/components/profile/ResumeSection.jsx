import { useState } from "react";
import { toast } from "react-toastify";

import { uploadResume } from "../../services/profileService";

function ResumeSection({ profile, fetchProfile }) {
  const [selectedResume, setSelectedResume] = useState(null);

  const handleUpload = async () => {
    if (!selectedResume) {
      return toast.error("Please select a resume.");
    }

    try {
      const response = await uploadResume(selectedResume);

      toast.success(response.message);

      setSelectedResume(null);

      fetchProfile();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to upload resume.");
    }
  };

  return (
    <div className="profile-card">
      <h2>📄 Resume</h2>

      <div className="resume-status">
        {profile?.profile?.resume?.url ? (
          <>
            <p className="resume-success">✅ Resume Uploaded</p>

            <a
              href={profile.profile.resume.url}
              target="_blank"
              rel="noreferrer"
              className="resume-link"
            >
              View Resume
            </a>
          </>
        ) : (
          <p className="resume-empty">No Resume Uploaded</p>
        )}
      </div>

      <input
        id="resumeUpload"
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;

          setSelectedResume(file);
        }}
      />

      <label htmlFor="resumeUpload" className="upload-label">
        📂 Choose Resume
      </label>

      {selectedResume && <p className="selected-file">{selectedResume.name}</p>}

      <button
        className="edit-btn"
        disabled={!selectedResume}
        onClick={handleUpload}
      >
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeSection;
