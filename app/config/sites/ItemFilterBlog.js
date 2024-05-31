
const urlPattern = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
const CONFIG = require('../../../config-json.js')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

const cheerio = require('cheerio');

let main = async function (item, options = {}) {

  if (!item.content) {
    return item
  }

  let {
    selector = 'article,#main,body',
    referer,
    proxy
  } = options

  // console.log(CONFIG.publicURL)
  // let urls = item.content.match(urlPattern).filter((url) => {
  //   if (url.startsWith(CONFIG.publicURL)) {
  //     return false
  //   }
  //   else if (url.startsWith('https://fetchrss.com')) {
  //     return false
  //   }
  //   else if (referer && url.startsWith(referer)) {
  //     return true
  //   }
  //   return true
  // }).map(url => {
  //   url = url.trim()
  //   if (url.endsWith('<br>')) {
  //     url = url.slice(0, -4)
  //   }
  //   return url
  // })
  // console.log(urls)
  // process.exit(1)

  let crawlTargetURL = item.link

  if (!crawlTargetURL) {
    return item
  }
  
  // console.log(crawlTargetURL)
  // process.exit(1)
  // console.log({selector})

  if (proxy) {
    crawlTargetURL = CONFIG.proxy + encodeURIComponent(crawlTargetURL)
  }

  let html = await ArticleExtract(crawlTargetURL, selector)
  html = ArticleRemoveAttributes(html)
  // console.log(article)
  // process.exit(1)

  item.content = html

  if (!item.thumbnail) {
    const $ = cheerio.load(html)
    let image = $('img').eq(0)
    item.thumbnail = image.attr('src')
  }
  else if (item.content.indexOf(item.thumbnail) === -1) {
    item.content = `<p><a href="${item.thumbnail}" target="_blank"><img src="${item.thumbnail}" /></a></p>\n` + item.content
  }

  return item
}

module.exports = main