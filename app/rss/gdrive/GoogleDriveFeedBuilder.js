const GoogleDriveIndexBuilder = require('./GoogleDriveIndexBuilder.js')

const GoogleDriveExtractorSpreadsheet = require('./extractor/GoogleDriveExtractorSpreadsheet.js')
const GoogleDriveExtractorDocument = require('./extractor/GoogleDriveExtractorDocument.js')
const GoogleDriveExtractorPresentation = require('./extractor/GoogleDriveExtractorPresentation.js')

const GoogleDriveExtractorHTML = require('./extractor/GoogleDriveExtractorHTML.js')
const GoogleDriveExtractorPDF = require('./extractor/GoogleDriveExtractorPDF.js')

const GoogleDriveExtractorFile = require('./extractor/GoogleDriveExtractorFile.js')

const fs = require('fs')

module.exports = async function (feedJSON) {
  GoogleDriveIndexBuilder(feedJSON)
  let {feedID} = feedJSON
  // console.log(feedJSON)

  if (!feedJSON.items) {
    return false
  }

  for (let i = 0; i < feedJSON.items.length; i++) {
    fs.writeFileSync(`/app/tmp/GetHTML.txt`, (new Date()).getTime() + '', 'utf8') 
    let {type, link} = feedJSON.items[i]

    // console.log(type, link)
    if (type === 'spreadsheet') {
      await GoogleDriveExtractorSpreadsheet(link, feedID)
    }
    else if (type === 'document') {
      await GoogleDriveExtractorHTML(link, feedID, type)
    }
    else if (type === 'presentation') {
      await GoogleDriveExtractorHTML(link, feedID, type)
    }
    else if (type === 'html') {
      await GoogleDriveExtractorFile(link, feedID, 'html')
    }
    // console.log(type, link)
  }
}