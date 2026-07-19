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
        error.response?.data?.message ||
          "Failed to upload profile picture."
      );
    }
  };

  const imageUrl =
    profile?.profile?.profilePicture?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.name || "User"
    )}&background=0D8ABC&color=fff&size=150`;

  return (
    <div className="profile-card">

      <h2>Profile Picture</h2>

      <div className="profile-picture-container">
        <img
          src={imageUrl}
          alt={profile?.name}
          className="profile-picture"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];

          if (!file) return;

          if (!file.type.startsWith("image/")) {
            return toast.error("Please select a valid image.");
          }

          setSelectedImage(file);
        }}
      />

      <button
        onClick={handleUpload}
        disabled={!selectedImage}
      >
        Upload Picture
      </button>

    </div>
  );
}

export default ProfilePicture;