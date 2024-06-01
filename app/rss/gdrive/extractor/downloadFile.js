const axios = require('axios');
const fs = require('fs');

const insertTitle = require('./insertTitle.js')

module.exports = async function (url, htmlFilePath) {
  // console.log({url})
  const response = await axios.get(url, { responseType: 'stream' });

  const contentDisposition = response.headers['content-disposition'];
  let filename = false

  if (contentDisposition) {
    // console.log({contentDisposition})
    filename = contentDisposition.slice(contentDisposition.lastIndexOf(`UTF-8''`) + 7, -5)
    // console.log(filename)
    filename = decodeURIComponent(filename)
    // console.log(filename) // 15-1. 檢索款目 - 112-2 資訊組織(一).html
  }


  // console.log({filename})

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(htmlFilePath);
    response.data.pipe(stream);
    stream.on('finish', () => {
      // if (filename !== false) {
      //   // insertTitle(htmlFilePath, filename)
      // }
      resolve(filename)
    });
    stream.on('error', reject);
  });
}