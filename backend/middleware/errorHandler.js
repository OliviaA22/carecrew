
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Default status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // Handle Sequelize validation errors
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = err.errors.map((error) => error.message);
  }

  // Handle unauthorized errors
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized access";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

// function errorHandler(err, req, res, next) {
//     console.error(err.stack);
  
//     // Default error status and message
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
  
//     res.status(statusCode).json({ error: message });
//   }
  
  module.exports = errorHandler;
  