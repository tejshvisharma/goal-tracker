import validationResult from "express-validator";
import ApiError from "../utils/apiError.js";

export default validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.empty()) {

    // extract Errors as an array from errors :
    const extractedErrors = errors.array.map((err) => ({
      field: err.path,
      message: err.message,
    }));

    // pass the error to global errorhandler:
    return next(
      new ApiError(422, "Received data is not valid", extractedErrors)
    );
  }

  next();
};
