import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProfile } from "../services/profileService";

import ProfilePicture from "../components/profile/ProfilePicture";
import ResumeSection from "../components/profile/ResumeSection";
import BasicInfo from "../components/profile/BasicInfo";
import AcademicInfo from "../components/profile/AcademicInfo";
import ProfessionalInfo from "../components/profile/ProfessionalInfo";
import CompanyInfo from "../components/profile/CompanyInfo";

import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="profile-page">
        <h2>Loading Profile...</h2>
      </section>
    );
  }

  return (
    <section className="profile-page">
      {/* Left Panel */}
      <div className="left-panel">
        <ProfilePicture
          profile={profile}
          fetchProfile={fetchProfile}
        />

        {profile.role === "student" && (
          <ResumeSection
            profile={profile}
            fetchProfile={fetchProfile}
          />
        )}
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <BasicInfo
          profile={profile}
          fetchProfile={fetchProfile}
        />

        {profile.role === "student" ? (
          <>
            <AcademicInfo
              profile={profile}
              fetchProfile={fetchProfile}
            />

            <ProfessionalInfo
              profile={profile}
              fetchProfile={fetchProfile}
            />
          </>
        ) : (
          <CompanyInfo
            profile={profile}
            fetchProfile={fetchProfile}
          />
        )}
      </div>
    </section>
  );
}

export default Profile;