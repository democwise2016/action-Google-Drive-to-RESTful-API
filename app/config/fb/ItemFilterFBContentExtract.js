const FBGetCrawlTargetURL = require('./../../fb/FBGetCrawlTargetURL.js')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

const ItemFilterImageEmbed = require('../common/ItemFilterImageEmbed.js')

let main = async function (item, options = {}) {

  if (!item.link) {
    return item
  }

  let { referer, selector } = options

  let crawlTargetURL = await FBGetCrawlTargetURL(item.link)
  // console.log({crawlTargetURL})
  // return item

  if (crawlTargetURL === 'post' || crawlTargetURL === 'video') {
    return item
  }

  if (referer && crawlTargetURL.startsWith(referer) === false) {
    return item
  }

  // ---------------

  let article = await extractArticle(crawlTargetURL, selector)
  // console.log(article)
  // process.exit(1)

  item.content = item.content + `<br />
<hr />
<br />
<a href="${crawlTargetURL}" target="_blank">${crawlTargetURL}</a>
<br />

${article}
`

  await ItemFilterImageEmbed(item, options)

  return item
}

let extractArticle = async function (input, selector) {
  try {
    let article = await ArticleExtract(input, selector)
    // console.log({input, article})
    // console.trace({selector})
    article = ArticleRemoveAttributes(article)
    // console.log(article)
    return article
  } catch (err) {
    console.error(err)
  }
}

module.exports = main