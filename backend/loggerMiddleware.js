const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server.log');

const loggerMiddleware = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} ${req.method} ${req.originalUrl}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Failed to write log');
  });
  next();
};

module.exports = loggerMiddleware;
