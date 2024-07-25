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

  const contentDisposition = response.headers['content-disposition'];
  let filename = false

  if (contentDisposition) {
    // console.log({contentDisposition})
    filename = contentDisposition.slice(contentDisposition.lastIndexOf(`UTF-8''`) + 7, -4)
    // console.log(filename)
    filename = decodeURIComponent(filename.trim())
    // console.log(filename) // 15-1. 檢索款目 - 112-2 資訊組織(一).html
  }

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(csvFilePath);
    response.data.pipe(stream);
    stream.on('finish', () => {
      resolve(filename)
    });
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
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
  });
}

function csvToTxt(csvFilePath, outputPath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          let output = results.map(item => {
            return Object.keys(item).map((key) => {
              return `${key}: ${item[key]}` 
            }).join('\n')
          }).join('\n\n####\n\n')

          await fs.promises.writeFile(outputPath, output);
          

          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
  });
    
}

function csvToHtml(csvFilePath, title, outputPath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results)

        // Generate HTML content
        let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
        html += `<meta charset="UTF-8">\n`;
        html += `  <title>${title}</title>\n`;
        html += '</head>\n<body>\n';
        html += `<h1>${title}</h1>\n`;
        html += '<table border="1">\n';

        // Add table headers
        if (results[0]) {
          html += '  <tr>\n';
          Object.keys(results[0]).forEach(header => {
            html += `    <th>${header.split('\n').join('<br />')}</th>\n`;
          });
          html += '  </tr>\n';
        }
          

        // Add data rows
        results.forEach(row => {
          html += '  <tr>\n';
          Object.values(row).forEach(cell => {
            html += `    <td>${cell.split('\n').join('<br />')}</td>\n`;
          });
          html += '  </tr>\n';
        });

        html += '</table>\n';
        html += '</body>\n</html>';

        // Write HTML to the specified output path
        fs.writeFile(outputPath, html, 'utf8', err => {
          if (err) {
            console.error('Error writing the HTML file:', err);
            reject(err)
            return;
          }
          console.log('HTML file has been generated successfully:', outputPath);
          resolve(outputPath)
        });
      });
  })
    
}

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
    fs.unlinkSync(csvFilePath)

    return [path.basename(htmlFilePath), path.basename(jsonFilePath), path.basename(txtFilePath)]
    // console.log(`JSON saved to ${jsonFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}