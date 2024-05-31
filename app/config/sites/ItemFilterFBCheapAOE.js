
// const urlPattern = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
// const header = 'https://www.coolpc.com.tw/tw/shop/case/'
// const CONFIG = require('../../../config-json.js')

// const ArticleExtract = require('../../article/ArticleExtract.js')
// const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

const denyList = [
  'https://richmore.cc/'
]

let main = async function (item, rss) {

  if (!item.content) {
    return item
  }

  for (let i = 0; i < denyList.length; i++) {
    let keyword = denyList[i]
    if (item.content.indexOf(keyword) > -1) {
      return false
    }
  }

  return item
}

module.exports = main