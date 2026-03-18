import express from "express";
import { login, signup, updateProfile, checkAuth } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

// Signup
userRouter.post("/signup", signup);

// Login
userRouter.post("/login", login);

// Update Profile
userRouter.put("/update-profile", protectRoute, updateProfile);

// Check Auth
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;