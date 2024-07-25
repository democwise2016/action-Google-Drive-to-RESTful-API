/**
Node.js, download https://docs.google.com/spreadsheets/d/1hSyLB44moL7BRZaLQaOLCzLHfTsLyQ-rTnXRvJujxTA/edit?usp=sharing as CSV file
convert it to JSON, save to "/tmp/output.json"

 */

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const extractGoogleFileID = require('../extractGoogleFileID.js')
const GoogleDriveFeedFolderMaker = require('../GoogleDriveFeedFolderMaker.js')

const downloadCSV = require('./GoogleDriveExtractorSpreadsheet/downloadCSV.js')
const csvToHtml = require('./GoogleDriveExtractorSpreadsheet/csvToHtml.js')
const csvToJson = require('./GoogleDriveExtractorSpreadsheet/csvToJson.js')
const csvToTxt = require('./GoogleDriveExtractorSpreadsheet/csvToTxt.js')
const csvToTxtSlice = require('./GoogleDriveExtractorSpreadsheet/csvToTxtSlice.js')

module.exports = async function (url, feedID) {
  let id = extractGoogleFileID(url)
  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;

  const csvFilePath = path.join(feedFolder, `${id}.csv`);
  const jsonFilePath = path.join(feedFolder, `${id}.json`);
  const txtFilePath = path.join(feedFolder, `${id}.txt`);
  const htmlFilePath = path.join(feedFolder, `${id}.html`);

  try {
    let filename = await downloadCSV(csvUrl, csvFilePath);
    await csvToJson(csvFilePath, jsonFilePath);
    // await csvToHTML(csvFilePath, htmlFilePath);
    await csvToHtml(csvFilePath, filename, htmlFilePath)
    await csvToTxt(csvFilePath, txtFilePath)
    let slices = await csvToTxtSlice(csvFilePath, feedFolder, id)
    fs.unlinkSync(csvFilePath)

    return [path.basename(htmlFilePath), path.basename(jsonFilePath), path.basename(txtFilePath), ...slices]
    // console.log(`JSON saved to ${jsonFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}