const fs = require('fs');
const path = require('path');

/**
 * Lists all files under the given folder path synchronously.
 * @param {string} folderPath - The path to the folder.
 * @returns {string[]} - An array of file paths.
 */
function listAllFilesSync(folderPath) {
    let fileList = [];
    const files = fs.readdirSync(folderPath, { withFileTypes: true });

    files.forEach(file => {
        // const fullPath = path.join(folderPath, file.name);
        fileList.push(file.name)
    });

    return fileList
}

module.exports = listAllFilesSync