const fs = require('fs');
const path = require('path');

const CONFIG = require('./../../config-json.js')

const MAX_FILES = CONFIG.maxFileCache
const directoryPath = '/output/file-cache/';

const FileCacheClean = function () {
  // Read the list of files in the directory
  let files = fs.readdirSync(directoryPath)

  const fileCount = files.length;
  console.log('Number of files:', fileCount);

  if (fileCount <= MAX_FILES) {
    return true
  }

  // Convert file names to absolute paths
  const filePaths = files.map(file => path.join(directoryPath, file));

  // Get the stats for all files
  const fileStats = filePaths.map(filePath => ({
      path: filePath,
      stats: fs.statSync(filePath)
  }));

  // Sort files by their modification time (oldest first)
  fileStats.sort((a, b) => a.stats.mtimeMs - b.stats.mtimeMs);

  if (fileStats.length > 0) {
      // Delete the oldest file
      const oldestFilePath = fileStats[0].path;
      fs.unlinkSync(oldestFilePath)
      console.log('Oldest file deleted:', oldestFilePath);
  } else {
      console.log('No files in the directory to delete.');
  }

}

module.exports = FileCacheClean