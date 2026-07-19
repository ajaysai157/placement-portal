import { useState } from "react";
import { toast } from "react-toastify";

import { updateProfile } from "../../services/profileService";

function CompanyInfo({ profile, fetchProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    companyName: profile.profile.companyName || "",
    designation: profile.profile.designation || "",
    companyWebsite: profile.profile.companyWebsite || "",
    companyDescription:
      profile.profile.companyDescription || "",
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
          "Failed to update company information."
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

    setFormData({
      companyName: profile.profile.companyName || "",
      designation: profile.profile.designation || "",
      companyWebsite:
        profile.profile.companyWebsite || "",
      companyDescription:
        profile.profile.companyDescription || "",
    });
  };

  return (
    <div className="profile-card">

      <div className="card-header">

        <h2>Company Information</h2>

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
        <label>Company Name</label>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="info-group">
        <label>Designation</label>

        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="info-group">
        <label>Company Website</label>

        <input
          type="url"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="https://example.com"
        />
      </div>

      <div className="info-group">
        <label>Company Description</label>

        <textarea
          rows="5"
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="Write about your company..."
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

export default CompanyInfo;