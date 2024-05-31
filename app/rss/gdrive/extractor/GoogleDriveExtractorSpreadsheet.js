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

async function downloadCSV(url, csvFilePath) {
  const response = await axios.get(url, { responseType: 'stream' });
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(csvFilePath);
    response.data.pipe(stream);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

function csvToJson(csvFilePath, jsonFilePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await fs.promises.writeFile(jsonFilePath, JSON.stringify(results, null, 2));
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
}

module.exports = async function (url, feedID) {
  let id = extractGoogleFileID(url)
  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;

  const csvFilePath = path.join(feedFolder, `${id}.csv`);
  const jsonFilePath = path.join(feedFolder, `${id}.json`);

  try {
    await downloadCSV(csvUrl, csvFilePath);
    await csvToJson(csvFilePath, jsonFilePath);
    fs.unlinkSync(csvFilePath)
    // console.log(`JSON saved to ${jsonFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}