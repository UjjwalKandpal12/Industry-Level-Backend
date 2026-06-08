import ApiError from "../utils/ApiError.js";

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  await res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export { errorHandler };
