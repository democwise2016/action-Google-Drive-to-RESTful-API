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

async function downloadHTML(url, csvFilePath) {
  const response = await axios.get(url, { responseType: 'stream' });
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(csvFilePath);
    response.data.pipe(stream);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

module.exports = async function (url, feedID) {
  let id = extractGoogleFileID(url)
  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  const csvUrl = `https://docs.google.com/document/d/${id}/export?format=html`;

  const csvFilePath = path.join(feedFolder, `${id}.html`);

  try {
    await downloadHTML(csvUrl, csvFilePath);
    // console.log(`JSON saved to ${jsonFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}