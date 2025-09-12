import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import Goal from "../models/goal.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";


export const getGoals = asyncHandler(async (req, res) => {
  const { _id } = req.user; // Destructure correctly

  // ✅ Check if userId is provided
  if (!_id) {
    throw new ApiError(400, "User ID is required");
  }

  // ✅ Check if userId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new ApiError(400, "Invalid User ID format");
  }

  // ✅ Directly find goals for this user
  const allUserGoals = await Goal.find({ user: _id });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { goals: allUserGoals }, "Fetched successfully")
    );
});

export const setGoal = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title } = req.body; // ✅ Destructure properly

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Goal title is required");
  }

  if (!_id) {
    throw new ApiError(400, "User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new ApiError(400, "Invalid User ID format");
  }

  // ✅ Check if user exists
  const user = await User.findById(_id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newGoal = await Goal.create({
    title: title.trim(),
    user: _id,
  });



  return res
    .status(201)
    .json(new ApiResponse(201, newGoal, "Goal created successfully"));
});

export const updateGoal = asyncHandler(async (req, res) => {
    const {  id } = req.params;
    const { title } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw new ApiError(400, "Invalid Goal ID format");
    // }

    if (!title || title.trim().length === 0) {
  throw new ApiError(400, "Goal title is required");
}

    const goal = await Goal.findById(id);

    if (!goal) {
      throw new ApiError(404, "Goal not found");
    }

    goal.title = title;

    const updatedGoal = await goal.save();

return res.status(200).json(
    new ApiResponse(
     200,
     updatedGoal, 
     "Goal updated successfully"
    )
    )
});

export const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Goal ID format");
  }

   const deletedGoal = await Goal.findByIdAndDelete(id);

   if (!deletedGoal) {
     throw new ApiError(404, "Goal not found");
   }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedGoal, "Goal deleted successfully"));
});
