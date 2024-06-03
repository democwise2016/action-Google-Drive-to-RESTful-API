const GoogleDriveIndexBuilder = require('./GoogleDriveIndexBuilder.js')

const GoogleDriveExtractorSpreadsheet = require('./extractor/GoogleDriveExtractorSpreadsheet.js')

const GoogleDriveExtractorHTML = require('./extractor/GoogleDriveExtractorHTML.js')
const GoogleDriveExtractorPDF = require('./extractor/GoogleDriveExtractorPDF.js')

const GoogleDriveExtractorFile = require('./extractor/GoogleDriveExtractorFile.js')

const GoogleDriveFeedFolderMaker = require('./GoogleDriveFeedFolderMaker.js')
const listAllFiles = require('./listAllFiles.js')

const fs = require('fs')
const path = require('path')

module.exports = async function (feedJSON) {
  GoogleDriveIndexBuilder(feedJSON)
  let {feedID} = feedJSON
  // console.log(feedJSON)

  if (!feedJSON.items) {
    return false
  }

  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  let currentFiles = listAllFiles(feedFolder)

  let downloadedFiles = []
  for (let i = 0; i < feedJSON.items.length; i++) {
    fs.writeFileSync(`/app/tmp/GetHTML.txt`, (new Date()).getTime() + '', 'utf8') 
    let {type, link} = feedJSON.items[i]

    // console.log(type, link)
    if (type === 'spreadsheet') {
      downloadedFiles.push(await GoogleDriveExtractorSpreadsheet(link, feedID))
    }
    else if (type === 'document') {
      downloadedFiles.push(await GoogleDriveExtractorHTML(link, feedID, type))
    }
    else if (type === 'presentation') {
      downloadedFiles.push(await GoogleDriveExtractorHTML(link, feedID, type))
    }
    else if (type === 'html') {
      downloadedFiles.push(await GoogleDriveExtractorFile(link, feedID, 'html'))
    }
    // console.log(type, link)
  }

  // console.log(downloadedFiles)
  for (let i = 0; i < currentFiles.length; i++) {
    // console.log(currentFiles[i])

    if (downloadedFiles.indexOf(currentFiles[i]) === -1) {
      let fileToDelete = path.join(feedFolder, currentFiles[i])
      // console.log('d:' , fileToDelete)
      fs.unlinkSync(fileToDelete)
    }
  }
}