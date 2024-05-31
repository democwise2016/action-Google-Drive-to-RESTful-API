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

async function downloadHTML(url, htmlFilePath) {
  const response = await axios.get(url, { responseType: 'stream' });

  const contentDisposition = response.headers['content-disposition'];
  let filename = false

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+?)"/);
    if (match) {
      filename = match[1];

      if (filename.endsWith('.html')) {
        filename = filename.slice(0, -5)
      }
    }
  }


  // console.log({filename})

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(htmlFilePath);
    response.data.pipe(stream);
    stream.on('finish', () => {
      if (filename !== false) {
        insertTitle(htmlFilePath, filename)
      }
      resolve()
    });
    stream.on('error', reject);
  });
}

function insertTitle(filePath, title) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
  
    // Check if <head> tag exists
    const headTagIndex = data.indexOf('<head>');
    if (headTagIndex === -1) {
      console.error('No <head> tag found in the HTML file.');
      return;
    }
  
    // Insert the <title> tag after <head>
    const modifiedData = data.slice(0, headTagIndex + 6) + `\n<title>${title}</title>` + data.slice(headTagIndex + 6);
  
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      // console.log('Successfully inserted <title>HOMEPAGE</title> into the HTML file.');
    });
  });
}

module.exports = async function (url, feedID) {
  let id = extractGoogleFileID(url)
  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  const csvUrl = `https://docs.google.com/presentation/d/${id}/export/html`;

  const csvFilePath = path.join(feedFolder, `${id}.html`);

  try {
    await downloadHTML(csvUrl, csvFilePath);
    // console.log(`JSON saved to ${jsonFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}