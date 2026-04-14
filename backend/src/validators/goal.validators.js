import { body, param } from "express-validator";

export const goalTitleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Goal title is required")
    .isLength({ max: 100 })
    .withMessage("Goal title must be at most 100 characters"),
];

export const goalIdValidation = [
  param("id").isMongoId().withMessage("Invalid Goal ID format"),
];
