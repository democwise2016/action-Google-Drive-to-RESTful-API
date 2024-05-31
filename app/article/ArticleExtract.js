const axios = require('axios');
const cheerio = require('cheerio');

const ArticleRemoveAd = require('./ArticleRemoveAd.js')
const ArticleImageDelazy = require('./ArticleImageDelazy.js')
const fs = require('fs');

const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: false
});

const NodeCacheSqlite = require('./../lib/NodeCacheSqlite')

async function extractMainArticleHTML(url, selectors = [
  'main > .thin > .card',
  '.entry-content[itemprop="text"]',
  '.tdb_single_content .tdb-block-inner.td-fix-index',
  '.Zi_ad_ar_iR',
  '.first-thread > .user-comment-block',
  '.post> .card-body > .post-content',
  'article > .ag-article__content',
  '#article-content-inner[itemprop="articleBody"]',
  'article[id] > .td-post-content',
  'article[id] > .entry-content',
  'article[id] > .entry__content',
  '.article-body > .article-content > .article-content-inner',
  '.entry-content',
  '.p_mainnew',
  '.post-entry',
  'article', '#main', 'body',
  
]) {
  try {
    // Fetch the HTML content of the URL
    let html = await NodeCacheSqlite.get(`ArticleExtract`, url, async () => {
      const response = await axios.get(url, {httpsAgent: agent});
      return response.data.trim();
    }, 1000 * 60 * 60 * 24 * 90)

    // Load the HTML content into cheerio for manipulation
    

    // Add your specific logic here to identify the main article content.
    // This might involve looking for certain HTML elements or classes that typically
    // contain the main article content.
    // For example, if the main content is usually contained in <article> elements:

    if (selectors && typeof(selectors) === 'string') {
      selectors = [selectors]
    }

    let $
    let article
    for (let i = 0; i < selectors.length; i++) {
      let selector = selectors[i]
      $ = cheerio.load(html);
      let tmpArticle = $(selector)
      // console.log({selector})
      // console.log(article.length)
      if (tmpArticle.length > 0) {
        article = tmpArticle.eq(0)
        html = article.html()
        break
      }
    }
      

    if (article.length === 0) {
      console.error('Selectors not found: ' + selectors + ' ' + url + ' ' + html.indexOf('Zi_ad_ar_iR'))
      fs.writeFileSync('/app/tmp/article.html', html, 'utf8')
      return html
    }

    article = ArticleRemoveAd(article)
    article = ArticleImageDelazy(article, url)
    

    const mainArticle = article.html().trim()

    return mainArticle;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// const targetURL = 'https://www.example.com'; // Replace with your target URL
// extractMainArticleHTML(targetURL)
//   .then(mainArticleHTML => {
//     if (mainArticleHTML) {
//       console.log('Main Article HTML:');
//       console.log(mainArticleHTML);
//     } else {
//       console.log('Failed to extract main article HTML.');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });

module.exports = extractMainArticleHTML