const FileCacheURLtoFilename = require('./FileCacheURLtoFilename.js')
const FileCacheMkdir = require('./FileCacheMkdir.js')

const FileCacheDownload = require('./FileCacheDownload.js')
const FileCacheClean = require('./FileCacheClean.js')

const FileCacheFilenameToPublicURL = require('./FileCacheFilenameToPublicURL.js')

const fs = require('fs')
const path = require('path')

const CONFIG = require('./../../config-json.js')

const FileCache = async function (url, options = {}) {
   if (!url || url === '') {
    return ''
   }
   if (url.startsWith(CONFIG.publicURL)) {
    return url
   }

  //  console.log({'file-cache': url})

  let filename = FileCacheURLtoFilename(url)
  FileCacheMkdir()

  let cachePath = path.join('/output/file-cache/', filename)
  if (fs.existsSync(cachePath)) {
    return FileCacheFilenameToPublicURL(filename)
  }

  fs.writeFileSync(`/app/tmp/GetHTML.txt`, (new Date()).getTime() + '', 'utf8') 
  await FileCacheDownload(url, cachePath, options)
  fs.writeFileSync(`/app/tmp/GetHTML.txt`, (new Date()).getTime() + '', 'utf8') 
  FileCacheClean()
  fs.writeFileSync(`/app/tmp/GetHTML.txt`, (new Date()).getTime() + '', 'utf8') 

  return FileCacheFilenameToPublicURL(filename)
}

module.exports = FileCache