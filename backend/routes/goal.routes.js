import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controllers.js";
import validate from "../middleware/validate.middleware.js";
import {
  goalTitleValidation,
  goalIdValidation,
} from "../validators/goal.validators.js";
const router = Router();

router
  .route("/")
  .get(isLoggedIn, getGoals)
  .post(isLoggedIn, goalTitleValidation, validate, setGoal);

router
  .route("/:id")
  .put(isLoggedIn, goalIdValidation, goalTitleValidation, validate, updateGoal)
  .delete(isLoggedIn, goalIdValidation, validate, deleteGoal);

export default router;
