const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    const logEntry = `${Date.now()}: ${req.method} ${req.url} from ${
      req.ip || "Unknown IP"
    }\n`;
    fs.appendFile(fileName, logEntry, (err) => {
      if (err) console.error("Error writing to log file:", err);
      console.log(`[LOG] ${logEntry.trim()}`);
      next();
    });
  };
}

module.exports = {
    logReqRes,
}
