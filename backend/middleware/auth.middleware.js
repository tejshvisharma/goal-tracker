import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";


 const isLoggedIn = asyncHandler(async(req,res,next)=>{
    
    const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "").trim();
    
      if (!accessToken) {
        throw new ApiError(401, "No Token Found, Unauthorized request");
      }

    try {
        const decoded = jwt.verify(accessToken,process.env.JWT_SECRET);
        const user = await User.findById(decoded?._id)
        .select("_id username email");
        
        if (!user) {
              throw new ApiError(401, "User not found");
            }
        
            req.user = user;
        
        next();
    } catch (err) {
        return next(err);
    }
 });
 
 export {isLoggedIn}