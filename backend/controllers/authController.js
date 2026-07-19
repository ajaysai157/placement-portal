import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../errors/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { email, password, role} = req.body;
    const name = req.body.name?.trim();

    if(!name || !email || !password || !role){
      throw new ApiError(400,"All fields are required");
    }

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role,
    })
    
    return res.status(201).json({
      success:true,
      message:"User created Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

});

export const loginUser =asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
      throw new ApiError(400,"All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401,"Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      throw new ApiError(401,"Invalid email or password");
    }

    const token = generateToken(user);

    return res.status(200).json({
      success:true,
      message:"Login Successful",
      token,
      user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
      },
    })

})

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});