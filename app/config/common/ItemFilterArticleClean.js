const ArticleImageDelazy = require('../../article/ArticleImageDelazy');
const ArticleRemoveAd = require('../../article/ArticleRemoveAd');
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes');

const cheerio = require('cheerio');

let main = async function (item, options = {}) {
  let content = item.content
  
  if (!content) {
    return item
  }

  content = ArticleRemoveAttributes(content)

  $ = cheerio.load(content);
  article = $('body')

  article = ArticleImageDelazy(article)
  article = ArticleRemoveAd(article)

  item.content = article.html()

  return item
}

module.exports = main