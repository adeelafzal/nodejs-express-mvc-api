const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `Time: ${Date.now()}, Type: ${req.method}, URL: ${req.path}\n`,
      (err, data) => {
        next();
      },
    );
  };
}

module.exports = { logReqRes };
