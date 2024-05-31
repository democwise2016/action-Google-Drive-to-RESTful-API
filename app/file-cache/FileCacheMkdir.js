const fs = require('fs')

module.exports = function () {
  const directoryPath = '/output/file-cache/';

// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
    // Create the directory
    fs.mkdirSync(directoryPath, { recursive: true });
    // console.log('Directory created:', directoryPath);
} else {
    // console.log('Directory already exists:', directoryPath);
}
}