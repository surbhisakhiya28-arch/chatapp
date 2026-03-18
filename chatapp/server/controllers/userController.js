import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// ✅ Signup
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      user: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userData.password
    );

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(userData._id);

    res.json({
      success: true,
      user: userData,
      token,
      message: "Login successful"
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Check Auth
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// ✅ Update Profile
export const updateProfile = async (req, res) => {

  try {

    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    let updatedUser;

    // if image not provided
    if (!profilePic) {

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );

    } 
    else {

      // upload base64 image to Cloudinary
      const upload = await cloudinary.uploader.upload(profilePic, {
        folder: "chat_profiles",
        resource_type: "image"
      });

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullName
        },
        { new: true }
      );

    }

    res.json({
      success: true,
      user: updatedUser
    });

  } 
  catch (error) {

    console.log("Profile update error:", error);

    res.json({
      success: false,
      message: error.message
    });

  }

};