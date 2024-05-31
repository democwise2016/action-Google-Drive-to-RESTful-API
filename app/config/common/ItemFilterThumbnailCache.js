const FileCache = require('./../../file-cache/FileCache.js');

let main = async function (item, options) {
  // console.log(item)
  if (!item.thumbnail) {
    return item
  }

  item.thumbnail = await FileCache(item.thumbnail, options)

  return item
}

module.exports = main