const GoogleDriveIndexBuilder = require('./GoogleDriveIndexBuilder.js')

const GoogleDriveExtractorSpreadsheet = require('./extractor/GoogleDriveExtractorSpreadsheet.js')
const GoogleDriveExtractorDocument = require('./extractor/GoogleDriveExtractorDocument.js')
const GoogleDriveExtractorPresentation = require('./extractor/GoogleDriveExtractorPresentation.js')

module.exports = async function (feedJSON) {
  GoogleDriveIndexBuilder(feedJSON)
  let {feedID} = feedJSON
  // console.log(feedJSON)

  for (let i = 0; i < feedJSON.items.length; i++) {
    let {type, link} = feedJSON.items[i]

    if (type === 'spreadsheet') {
      await GoogleDriveExtractorSpreadsheet(link, feedID)
    }
    else if (type === 'document') {
      await GoogleDriveExtractorDocument(link, feedID)
    }
    else if (type === 'presentation') {
      await GoogleDriveExtractorPresentation(link, feedID)
    }
    console.log(type, link)
  }
}