
const urlPattern = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
const CONFIG = require('../../../config-json.js')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

const cheerio = require('cheerio');

let main = async function (item, options = {}) {

  if (!item.content) {
    return item
  }

  let needle = `\n<br>\nhttp`
  let pos = item.content.indexOf(needle)
  if (pos === -1) {
    return item
  }

  // let end = 
  let crawlTargetURL = item.content.slice(pos + 6).trim()
  if (crawlTargetURL.indexOf('\n') > -1) {
    crawlTargetURL = crawlTargetURL.slice(0, crawlTargetURL.indexOf('\n')).trim()
  }
  
  if (!crawlTargetURL) {
    return item
  }

  let html = await ArticleExtract(crawlTargetURL)
  if (!html) {
    return item
  }
  html = ArticleRemoveAttributes(html)
  // console.log(article)
  // process.exit(1)

  item.content = item.content + `<br /><hr />
<p><a href="${crawlTargetURL}" target="_blank">${crawlTargetURL}</a></p>
${html}`

  if (!item.thumbnail) {
    const $ = cheerio.load(item.content)
    let image = $('img').eq(0)
    item.thumbnail = image.attr('src')
  }

  return item
}

module.exports = main