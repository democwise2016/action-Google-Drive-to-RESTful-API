/**
Node.js, download https://docs.google.com/spreadsheets/d/1hSyLB44moL7BRZaLQaOLCzLHfTsLyQ-rTnXRvJujxTA/edit?usp=sharing as CSV file
convert it to JSON, save to "/tmp/output.json"

 */

const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const ShellSpawn = require('./../../../lib/ShellSpawn.js')

const extractGoogleFileID = require('../extractGoogleFileID.js')
const GoogleDriveFeedFolderMaker = require('../GoogleDriveFeedFolderMaker.js')

// const filenameRegex = /filename\*=['"]?([^;]+)['"]?;?/i;
const downloadFile = require('./downloadFile.js')

module.exports = async function (url, feedID, ext = 'html') {
  let id = extractGoogleFileID(url)
  let feedFolder = GoogleDriveFeedFolderMaker(feedID)
  // console.log(url)

  // https://drive.google.com/file/d/1u79ebOENe_SKR-agEILn6U7G704CN8xP/view?usp=sharing
  const fileUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  // const pdfFilePath = path.join(feedFolder, `${id}.pdf`);
  const htmlFilePath = path.join(feedFolder, `${id}.${ext}`);

  try {
    // let filename = await downloadFile(pdfUrl, pdfFilePath);
    // console.log(`JSON saved to ${jsonFilePath}`);

    // let command = `/pdf2htmlEX.AppImage ${pdfFilePath} ${htmlFilePath}`
    // await ShellSpawn(command)
    // java -jar tika-app-2.7.0.jar -h document.pdf > document.html

    // fs.unlinkSync(pdfFilePath)
    await downloadFile(fileUrl, htmlFilePath);

    return [path.basename(htmlFilePath)]
  } catch (error) {
    console.error('Error:', error);
  }
}