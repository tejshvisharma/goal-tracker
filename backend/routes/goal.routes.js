import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { getGoals, setGoal, updateGoal, deleteGoal } from "../controllers/goal.controllers.js";
const router = Router();

router.route("/").get(isLoggedIn, getGoals)
      .post(isLoggedIn, setGoal);

router.route("/:id")
      .put(isLoggedIn, updateGoal)
      .delete(isLoggedIn, deleteGoal);
    

export default router;