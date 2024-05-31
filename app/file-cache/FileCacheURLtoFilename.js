const URL = require('url')

const crypto = require('crypto');

const path = require('path');

function generateMD5Hash(inputString) {
  const md5Hash = crypto.createHash('md5').update(inputString).digest('hex');
  return md5Hash;
}

module.exports = function (url) {
  // console.trace('url', url)

  let queryData = URL.parse(url, true)
  // console.log(queryData)
  // if (queryData.channel_id) {
  //   return 'ch_' + queryData.channel_id
  // }
  // else if (queryData.list) {
  //   return 'pl_' + queryData.list
  // }
  // else if (queryData.playlist_id) {
  //   return 'pl_' + queryData.playlist_id
  // }
  let host = queryData.host

  const md5Hash = generateMD5Hash(url)

  const parsedUrl = URL.parse(url, true);
  const filenameWithQuery = path.basename(parsedUrl.pathname); // This gets "image.jpg?width=800&height=600"
  const filenameWithoutQuery = filenameWithQuery.split('?')[0]; // This removes the query part

  let extension = path.extname(filenameWithoutQuery);
  let extList = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  if (extension === '' || extension === '.php') {
    for (let i = 0; i < extList.length; i++) {
      if (url.indexOf(extList[i]) > -1) {
        extension = extList[i]
        break
      }
    }  
  }
  else if (extList.indexOf(extension) === -1)  {
    extension = '.png'
  }

  return host + '-' + md5Hash.slice(0, 10) + extension
}