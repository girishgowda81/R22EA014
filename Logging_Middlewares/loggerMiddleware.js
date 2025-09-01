// Logging Middlewares/loggerMiddleware.js
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "requests.log");

const loggerMiddleware = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

  // Append log to file
  fs.appendFile(logFilePath, log, (err) => {
    if (err) console.error("Failed to write log:", err);
  });

  console.log(log.trim()); // Also log to console
  next();
};

module.exports = loggerMiddleware;
