const cPTTRemoveMetaline = require('./ptt/cPTTRemoveMetaline.js')
const cPTTLoadImgur = require('./ptt/cPTTLoadImgur.js')
const cPTTMergeLines = require('./ptt/cPTTMergeLines.js')
const cPTTRemoveCache = require('./ptt/cPTTRemoveCache.js')
const PTTAddBr = require('./ptt/PTTAddBr.js')

const cheerio = require('cheerio')

let main = async function (item, options = {}) {

  if (!item.title) {
    return false
  }

  let title = item.title
  if (title.startsWith('[實況]')) {
    return false
  }

  if (!item.content) {
    return item
  }

  //console.log(content)
  //console.log(content.indexOf('p-80'))
  const $ = cheerio.load(item.content)
  
  cPTTRemoveMetaline($)
  cPTTLoadImgur($)
  cPTTRemoveCache($)
  let content = cPTTMergeLines($)
  content = PTTAddBr(content)

  item.content = content

  return item
}

module.exports = main