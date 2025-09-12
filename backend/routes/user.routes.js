// routes/authRoutes.js
import express from "express";
import { loginUser, registerUser, getAllUsers, getMe } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/me", isLoggedIn, getMe);
router.get("/all-users", getAllUsers);


export default router;
