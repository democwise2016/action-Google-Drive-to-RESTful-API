const FBGetCrawlTargetURL = require('./../../fb/FBGetCrawlTargetURL.js')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

const ItemFilterImageEmbed = require('../common/ItemFilterImageEmbed.js')

let main = async function (item, rss) {

  if (!item.link) {
    return item
  }

  let crawlTargetURL = await FBGetCrawlTargetURL(item.link)
  // console.log({crawlTargetURL})
  // return item

  if (crawlTargetURL.startsWith('http://tomchun.tw/tomchun/') === false) {
    return false
  }

  // ---------------

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

  await ItemFilterImageEmbed(item, {
    referer: 'https://tomchun.tw/'
  })

  return item
}

let extractArticle = async function (input) {
  try {
    let article = await ArticleExtract(input, '.entry-content')
    article = ArticleRemoveAttributes(article)
    // console.log(article)
    return article
  } catch (err) {
    console.error(err)
  }
}

module.exports = main