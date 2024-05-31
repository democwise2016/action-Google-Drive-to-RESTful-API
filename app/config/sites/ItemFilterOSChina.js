
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
    referer
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

  if (crawlTargetURL.startsWith('https://www.oschina.net/news/')) {
    selector = '.article-detail > .content'
  }
  else if (crawlTargetURL.startsWith('https://gitee.com/')) {
    selector = '.file_content.markdown-body'
  }
  else if (crawlTargetURL.startsWith('https://my.oschina.net/')) {
    selector = '.article-detail > .content'
  }
  else if (crawlTargetURL.startsWith('https://www.oschina.net/p/')) {
    selector = '#intro > .section-body .article-detail .content'
  }
  else {
    selector = '.article-detail > .content'
  }
  // https://my.oschina.net/u/4843764/blog/10101685
  // https://gitee.com/horsejs_admin/ScreenCapture

  // console.log(crawlTargetURL)
  // process.exit(1)
  // console.log({selector})
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

  return item
}

module.exports = main