const cheerio = require('cheerio');

let main = async function (item, rss) {
  // console.log(item)
  let content = item.content

  if (!content) {
    return item
  }

  let $ = cheerio.load(content)

  // --------------------------------

  $('script').remove()
  
  $('blockquote').each(function () {
    const $this = $(this);
    $this.replaceWith($this.html());
  });

  // --------------------------------

  item.content = $('body').html()

  return item
}

module.exports = main