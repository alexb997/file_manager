const fs = require('fs');
const path = require('path');

function listFiles(dirPath = __dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(new Error(`Unable to read directory: ${err.message}`));
      }

      resolve(files);
    });
  });
}

module.exports = { listFiles };