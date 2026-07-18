import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../errors/ApiError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const {
    phone,
    college,
    branch,
    graduationYear,
    cgpa,
    skills,
    bio,
    github,
    linkedin,
    companyName,
    designation,
    companyWebsite,
    companyDescription,
  } = req.body;

  user.profile.phone = phone ?? user.profile.phone;
  user.profile.college = college ?? user.profile.college;
  user.profile.branch = branch ?? user.profile.branch;
  user.profile.graduationYear = graduationYear || user.profile.graduationYear;
  user.profile.cgpa = cgpa ?? user.profile.cgpa;
  user.profile.skills = skills || user.profile.skills;
  user.profile.bio = bio || user.profile.bio;
  user.profile.github = github || user.profile.github;
  user.profile.linkedin = linkedin || user.profile.linkedin;

  user.profile.companyName = companyName || user.profile.companyName;
  user.profile.designation = designation || user.profile.designation;
  user.profile.companyWebsite = companyWebsite || user.profile.companyWebsite;
  user.profile.companyDescription =
    companyDescription || user.profile.companyDescription;

  await user.save();
  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});
