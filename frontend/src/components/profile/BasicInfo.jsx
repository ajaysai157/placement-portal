import { useState } from "react";
import { toast } from "react-toastify";

import { updateProfile } from "../../services/profileService";

function BasicInfo({ profile, fetchProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    phone: profile.profile.phone || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          "Failed to update profile."
      );
    }
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2>Basic Information</h2>

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
        <label>Name</label>

        <input
          type="text"
          value={profile.name}
          readOnly
        />
      </div>

      <div className="info-group">
        <label>Email</label>

        <input
          type="email"
          value={profile.email}
          readOnly
        />
      </div>

      <div className="info-group">
        <label>Phone</label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="info-group">
        <label>Role</label>

        <input
          type="text"
          value={profile.role}
          readOnly
        />
      </div>

      {isEditing && (
        <div className="button-group">
          <button onClick={handleSave}>
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);

              setFormData({
                phone: profile.profile.phone || "",
              });
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default BasicInfo;