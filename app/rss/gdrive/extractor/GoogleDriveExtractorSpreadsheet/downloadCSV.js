
const fs = require('fs')

const axios = require('axios');

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

module.exports = downloadCSV