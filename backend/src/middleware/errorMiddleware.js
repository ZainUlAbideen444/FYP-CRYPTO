export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || (error.name === "CastError" ? 400 : 500);
  res.status(status).json({ success: false, message: error.message || "Unexpected server error." });
}
