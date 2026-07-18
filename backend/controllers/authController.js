import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../errors/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { email, password, role} = req.body;
    const name = req.body.name?.trim();

    if(!name || !email || !password || !role){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
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

export const loginUser = async (req,res) => {
  try{
    const { email, password } = req.body;
    
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
          success: false,
          message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({
        success:false,
        message:"Invalid email or password"
      })
    }

    const token = generateToken(user);

    res.status(200).json({
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
  }
  catch(error){
    console.error(error);
    
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}