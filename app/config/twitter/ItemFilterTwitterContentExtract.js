const cheerio = require('cheerio');
const GetHTML = require('./../../lib/GetHTML.js')

let main = async function (item, rss) {
  // console.log(item)
  let crawlerTargetURL = item.link

  if (!crawlerTargetURL) {
    return item
  }

  let html = await GetHTML(crawlerTargetURL, {
    crawler: 'puppeteer'
  })

  const $ = cheerio.load(html)
  // console.log(html.indexOf('https://pbs.twimg.com/media/'))

  const imageUrls = [];

  $('img[src^="https://pbs.twimg.com/media/"]').each((index, element) => {
    let imageUrl = $(element).attr('src');

    if (imageUrl.indexOf('&name=') > -1) {
      imageUrl = imageUrl.slice(0, imageUrl.lastIndexOf('&'))
    }
    if (imageUrl.endsWith('?format=webp')) {
      imageUrl = imageUrl.slice(0, imageUrl.lastIndexOf('?')) + '?format=jpg'
    }
    imageUrls.push(imageUrl);
  });

  if (imageUrls.length === 0 && item.thumbnail) {
    // console.log(item.thumbnail)
    imageUrls.push(item.thumbnail)
  }

  // ----------------------------------------------------------------

  // console.log(imageUrls)
  // ----------------

  item.content = item.content + imageUrls.map(url => {
    
    return `
<p><a href="${url}" target="_blank"><img src="${url}" /></a></p>`
  }).join('\n')


  return item
}

module.exports = main