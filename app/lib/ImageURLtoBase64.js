const request = require('request');
const NodeCacheSqlite = require('./NodeCacheSqlite.js')

const path = require('path');
const url = require('url');
const mime = require('mime-types');

let getMIMEType = function (imageUrl) {
  let mimeType = mime.lookup(imageUrl);

  if (mimeType) {
    return mimeType
  }

  const parsedUrl = url.parse(imageUrl);
  const filenameWithQuery = path.basename(parsedUrl.pathname); // This gets "image.jpg?width=800&height=600"
  const filenameWithoutQuery = filenameWithQuery.split('?')[0]; // This removes the query part

  const extension = path.extname(filenameWithoutQuery);

  if (extension) {
    mimeType = mime.lookup(extension);

    if (mimeType) {
      return mimeType
    }
  }

  return 'application/octet-stream'
}

let ImageURLtoBase64 = function (imageUrl) {
  if (!imageUrl) {
    return ''
  }
  return new Promise((resolve, reject) => {
    // Make an HTTP request to fetch the image
    request.get({ url: imageUrl, encoding: null }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
          // Convert the image buffer to base64
          let base64Image = body.toString('base64');

          
          let mimeType = getMIMEType(imageUrl)
          // if (['.jpg', '.jpeg'].indexOf(extension) > -1) {
          //   base64Image = 'data:application/pdf;base64,' + base64Image
          // }
          base64Image = 'data:' + mimeType + ',' + base64Image
          // Write the base64 string to a file
          // fs.writeFileSync(outputFilePath, base64Image, 'base64');
          
          // console.log('Image converted and saved as base64 string.');
          resolve(base64Image);
      } else {
          reject('Error fetching the image:', error);
      }
  })
  })
    
}

let CACHE_TIME = 1000 * 60 * 60 * 24 * 60
// CACHE_TIME = 0

let ImageURLtoBase64Cache = function (imageUrl) {
  return NodeCacheSqlite.get('ImageURLtoBase64', imageUrl, async () => {
    return await ImageURLtoBase64(imageUrl)
  }, CACHE_TIME)
}

module.exports = ImageURLtoBase64
