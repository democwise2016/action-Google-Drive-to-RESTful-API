const cheerio = require('cheerio')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

let main = async function (item, options) {

  if (!item.content) {
    return item
  }

  //console.log(content)
  //console.log(content.indexOf('p-80'))
  let $ = cheerio.load(item.content)
  
  let collection = $('table[eo-row="two-column"] td[width="50%"]')

  //console.trace(collection.length)
  let contents = []
  let links = []
  for (let i = 1; i < collection.length; i++) {
    
    let content = collection.eq(i)


    let cells = []

    let tables = content.find('td').eq(0).children('table')
    for (let j = 0; j < tables.length; j++) {
      let h = tables.eq(j).find('td:last').html().trim()
      // if (h === '<br>') {
      //   continue
      // }
      cells.push(h)
    }
    // item.find('td').eq(0).children('table').eq(2).remove()

    // let aTag = item.find('a:last').parent().html()

    // // item.after(aTag)
    // item.find('td').eq(0).children('table').eq(3).remove()

    let html = cells.join('\n')
    while (html.indexOf('  ') > -1) {
      html = html.replace(/  /g, ' ')
    }
    html = html.split('<span></span>').join('')
    html = html.split('</div> <br>').join('</div>')
    
    while (html.indexOf('\n\n') > -1) {
      html = html.replace(/\n\n/g, '\n')
    }

    let $html = cheerio.load(html)
    let htmlText = $html('body').text().trim()
    if (htmlText.startsWith('Powered by') || htmlText.startsWith('UNSUBSCRIBE')) {
      continue
    }

    let href = $html('a[href]:last').attr('href')
    links.push(href)

    html = await crawlBook(html)

    contents.push(html)
  }

  // ----------------------------------------------------------------

  let titles = []
  for (let i = 0; i < contents.length; i++) {
    let content = contents[i]

    let $content = cheerio.load(content)

    // titles.push(item.title + ' : ' + $('div:first').text().trim())
    let title = $content('div:first').text().trim()

    if (title.startsWith('•')) {
      title = title.slice(1).trim()
    }

    titles.push(title + ' | ' + item.title)
  }

  // console.log(titles)


  if (contents.length === 0) {
    return '(No data)'
  }

  // ----------------------------------------------------------------



  // ----------------------------------------------------------------
  


  // item.content = items.join('\n<hr/>\n')
  item.title = titles
  item.content = contents
  item.link = links

  // console.log(item.link)

  return item
}

let crawlBook = async function (html) {
  let $html = cheerio.load(html)
  let href = $html('a[href]:last').attr('href')
  
  // console.log(href)

  let bookHTML = await ArticleExtract(href, 'article.content > section:last')

  html = html + `
<hr />
<p><a href="${href}" target="_blank">${href}</a></p>
` + bookHTML

  html = ArticleRemoveAttributes(html)

  return html
}

module.exports = main