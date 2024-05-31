const cheerio = require('cheerio')

let main = async function (item, rss) {
  // console.log(item)
  let content = item.content

  // console.log(item)
  // process.exit(0)

  if (!content) {
    return item
  }

  // ------------

  const $ = cheerio.load(content)

  
  let list = $(`iframe`)
  // console.log(list.length)
  for (let i = 0; i < list.length; i++) {
    let ele = list.eq(i)
    let src = ele.attr('src')
    // ele.before(`<p><a href="${src}" target="_blank">${src}</a></p>`)
    // ele.remove()
    // console.log({src})
    if (src) {
      // ele.replaceWith(`<p><a href="${src}" target="_blank">${src}</a></p>`);
      // ele.replaceWith(`<iframe src="${item.link}"></iframe>`);
      ele.replaceWith(`<p><a href="${item.link}" target="_blank">[VIDEO] ${item.link}</a></p>`);
    }
  }

  // ------------
  
  item.content = $('body').html()

  return item
}

module.exports = main