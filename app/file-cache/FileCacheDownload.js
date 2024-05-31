const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function FileCacheDownload(url, outputPath, options = {}) {
  try {
    const imageUrl = url
    const outputFilePath = outputPath

    let headers = {}

    let {referer} = options

    if (referer) {
      headers.Referer = referer
    }

    const response = await axios.get(imageUrl, { headers, responseType: 'stream' });

    const writer = fs.createWriteStream(outputFilePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = FileCacheDownload