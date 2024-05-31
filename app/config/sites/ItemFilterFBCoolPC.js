
const urlPattern = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
const header = 'https://www.coolpc.com.tw/tw/shop/case/'
const CONFIG = require('./../../../config-json.js')

const ArticleExtract = require('./../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('./../../article/ArticleRemoveAttributes.js')

let main = async function (item, rss) {

  if (!item.content) {
    return item
  }

  // console.log(CONFIG.publicURL)
  let urls = item.content.match(urlPattern).filter((url) => {
    if (url.startsWith(CONFIG.publicURL)) {
      return false
    }
    else if (url.startsWith('https://fetchrss.com')) {
      return false
    }
    else if (url.startsWith(header)) {
      return true
    }
    return true
  }).map(url => {
    url = url.trim()
    if (url.endsWith('<br>')) {
      url = url.slice(0, -4)
    }
    return url
  })
  // console.log(urls)
  // process.exit(1)

  let crawlTargetURL = urls[0]

  if (!crawlTargetURL) {
    return item
  }
  
  // console.log(crawlTargetURL)
  // process.exit(1)

  let article = await extractArticle(crawlTargetURL)
  // console.log(article)
  // process.exit(1)

  item.content = item.content + `<br />
<hr />
<br />
<a href="${crawlTargetURL}" target="_blank">${crawlTargetURL}</a>
<br />

${article}
`

  return item
}

let extractArticle = async function (input) {
  try {
    let article = await ArticleExtract(input, '.woocommerce-tabs .post-content')
    article = ArticleRemoveAttributes(article)
    // console.log(article)
    return article
  } catch (err) {
    console.error(err)
  }
}

module.exports = main