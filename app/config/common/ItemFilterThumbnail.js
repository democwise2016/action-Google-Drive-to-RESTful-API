const cheerio = require('cheerio')

let main = async function (item, rss) {
  // console.log(item)
  let content = item.content

  // console.log(item)
  // process.exit(0)

  if (!content || item.thumbnail) {
    return item
  }

  const $ = cheerio.load(content)

  let image = $('img').eq(0)
  if (image.length === 0) {
    return item
  }

  item.thumbnail = image.attr('src')

  return item
}

module.exports = main