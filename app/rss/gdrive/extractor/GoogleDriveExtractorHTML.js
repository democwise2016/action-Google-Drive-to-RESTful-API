/**
Node.js, download https://docs.google.com/spreadsheets/d/1hSyLB44moL7BRZaLQaOLCzLHfTsLyQ-rTnXRvJujxTA/edit?usp=sharing as CSV file
convert it to JSON, save to "/tmp/output.json"

 */

const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const extractGoogleFileID = require('../extractGoogleFileID.js')
const GoogleDriveFeedFolderMaker = require('../GoogleDriveFeedFolderMaker.js')

// const filenameRegex = /filename\*=['"]?([^;]+)['"]?;?/i;
const downloadHTML = require('./downloadHTML.js')

module.exports = async function (url, feedID, type) {
  let id = extractGoogleFileID(url)
  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  const csvUrl = `https://docs.google.com/${type}/d/${id}/export/html`;

  const csvFilePath = path.join(feedFolder, `${id}.html`);

  try {
    await downloadHTML(csvUrl, csvFilePath);
    // console.log(`JSON saved to ${jsonFilePath}`);

    return [path.basename(csvFilePath)]
  } catch (error) {
    console.error('Error:', error);
  }
}