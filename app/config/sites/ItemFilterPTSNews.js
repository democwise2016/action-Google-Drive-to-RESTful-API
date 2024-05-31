const cheerio = require('cheerio')

const ArticleExtract = require('../../article/ArticleExtract.js')
const ArticleRemoveAttributes = require('../../article/ArticleRemoveAttributes.js')

let main = async function (item, options) {

  if (!item.content) {
    return item
  }

  const $ = cheerio.load(item.content)

  $('nav').remove()

  let collection = $('iframe[src]')
  for (let i = 0; i < collection.length; i++) {
    
    let item = collection.eq(i)
    let src = item.attr('src')

    if (src.startsWith('https://www.yo' + 'utu' + 'be.com/') === false) {
      continue
    }

    let id = src.slice(src.lastIndexOf('/') + 1)
    let imgURL = `https://img.you` + `tu` + `be.com/vi/${id}/maxresdefault.jpg`
    collection.eq(i).before(`<img src="${imgURL}" /><br />`)
  }

  item.content = $('body').html()

  

  return item
}

module.exports = main