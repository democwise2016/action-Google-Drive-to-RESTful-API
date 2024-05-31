const fs = require('fs')
const path = require('path')

module.exports = function (feedID) {
  let folderPath = path.join(__dirname, '../../../output/', feedID)
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {recursive: true})
  }
  return folderPath
}