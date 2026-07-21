import { useState } from "react";
import { toast } from "react-toastify";

import { uploadProfilePicture } from "../../services/profileService";

function ProfilePicture({ profile, fetchProfile }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = async () => {
    if (!selectedImage) {
      return toast.error("Please select an image.");
    }

    try {
      const response = await uploadProfilePicture(selectedImage);

      toast.success(response.message);

      setSelectedImage(null);

      fetchProfile();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to upload profile picture.",
      );
    }
  };

  const imageUrl =
    profile?.profile?.profilePicture?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.name || "User",
    )}&background=2563eb&color=fff&size=200`;

  return (
    <div className="profile-card">
      <h2>My Profile</h2>

      <div className="profile-picture-container">
        <img src={imageUrl} alt={profile?.name} className="profile-picture" />
      </div>

      <h3
        style={{
          textAlign: "center",
          marginBottom: "6px",
        }}
      >
        {profile?.name}
      </h3>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        {profile?.email}
      </p>

      <input
        id="profileUpload"
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;

          if (!file.type.startsWith("image/")) {
            return toast.error("Please select a valid image.");
          }

          setSelectedImage(file);
        }}
      />

      <label htmlFor="profileUpload" className="upload-label">
        📷 Choose Picture
      </label>

      {selectedImage && (
        <p
          style={{
            fontSize: "14px",
            color: "#2563eb",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          {selectedImage.name}
        </p>
      )}

      <button
        className="edit-btn"
        onClick={handleUpload}
        disabled={!selectedImage}
      >
        Upload Picture
      </button>
    </div>
  );
}

export default ProfilePicture;
