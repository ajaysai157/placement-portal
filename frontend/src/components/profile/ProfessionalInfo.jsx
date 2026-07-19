import { useState } from "react";
import { toast } from "react-toastify";

import { updateProfile } from "../../services/profileService";

function ProfessionalInfo({ profile, fetchProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    skills: profile.profile.skills.join(", "),
    github: profile.profile.github || "",
    linkedin: profile.profile.linkedin || "",
    bio: profile.profile.bio || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile(formData);

      toast.success(response.message);

      setIsEditing(false);

      fetchProfile();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update professional information."
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

    setFormData({
      skills: profile.profile.skills.join(", "),
      github: profile.profile.github || "",
      linkedin: profile.profile.linkedin || "",
      bio: profile.profile.bio || "",
    });
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2>Professional Information</h2>

        {!isEditing && (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      <div className="info-group">
        <label>Skills</label>

        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="Java, React, Node.js"
        />
      </div>

      <div className="info-group">
        <label>GitHub</label>

        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="https://github.com/username"
        />
      </div>

      <div className="info-group">
        <label>LinkedIn</label>

        <input
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <div className="info-group">
        <label>Bio</label>

        <textarea
          name="bio"
          rows="4"
          value={formData.bio}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="Write a short bio..."
        />
      </div>

      {isEditing && (
        <div className="button-group">
          <button onClick={handleSave}>
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfessionalInfo;