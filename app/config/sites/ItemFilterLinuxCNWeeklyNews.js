const cheerio = require('cheerio')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

let main = async function (item, options) {

  if (!item.content) {
    return item
  }

  if (!item.title || !item.title.trim().startsWith('硬核观察') ) {
    return false
  }

  // ----------------------------------------------------------------

  let contents = []
  let titles = []

  let lines = item.content.split('\n')

  let parts = []
  let temp = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    if (line.startsWith('<p class="sync-line"')) {
      if (temp !== '') {
        parts.push(temp)
        temp = ''
      }
    }

    temp = temp + line
  }

  if (temp !== '') {
    parts.push(temp)
  }

  // console.log('parts', parts.length)

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i]

    let $part = cheerio.load(part)

    if ($part('img').length > 1) {
      $part('img:first').remove()
    }

    titles.push($part('h3').text().trim())

    part = $part('body').html().trim()

    part = await crawlHTML(part)

    contents.push(part)
  }

  // ----------------------------------------------------------------
  
  // item.content = items.join('\n<hr/>\n')
  item.title = titles
  item.content = contents

  // console.log(titles)

  // console.log(item.link)

  return item
}

let crawlHTML = async function (html) {
  let $html = cheerio.load(html)
  let href = $html('a[href]:last').attr('href')
  
  // console.log(href)

  let bookHTML = await ArticleExtract(href)

  html = html + `
<hr />
<p><a href="${href}" target="_blank">${href}</a></p>
` + bookHTML

  html = ArticleRemoveAttributes(html)

  return html
}

module.exports = main