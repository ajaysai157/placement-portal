import { useState } from "react";
import { toast } from "react-toastify";

import { updateProfile } from "../../services/profileService";

function AcademicInfo({ profile, fetchProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    college: profile.profile.college || "",
    branch: profile.profile.branch || "",
    graduationYear: profile.profile.graduationYear || "",
    cgpa: profile.profile.cgpa || "",
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
          "Failed to update academic information."
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

    setFormData({
      college: profile.profile.college || "",
      branch: profile.profile.branch || "",
      graduationYear: profile.profile.graduationYear || "",
      cgpa: profile.profile.cgpa || "",
    });
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2>Academic Information</h2>

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
        <label>College</label>

        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="info-group">
        <label>Branch</label>

        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="info-group">
        <label>Graduation Year</label>

        <input
          type="number"
          name="graduationYear"
          value={formData.graduationYear}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="info-group">
        <label>CGPA</label>

        <input
          type="number"
          step="0.01"
          min="0"
          max="10"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
          readOnly={!isEditing}
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

export default AcademicInfo;