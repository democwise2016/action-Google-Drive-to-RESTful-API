
const CONFIG = require('./../../config-json.js')
// const path = require('path')
const publicURL = CONFIG.publicURL

const FileCacheFilenameToPublicURL = function (filename) {
  // console.log(filename)
  // process.exit(0)
  // const publicURL = CONFIG.publicURL
  // if (!publicURL) {
  //   return false
  // }
  return publicURL + 'file-cache/' + filename
}

module.exports = FileCacheFilenameToPublicURL