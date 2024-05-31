const GoogleDriveIndexBuilder = require('./GoogleDriveIndexBuilder.js')

module.exports = async function (feedJSON) {
  GoogleDriveIndexBuilder(feedJSON)
  console.log(feedJSON)
}