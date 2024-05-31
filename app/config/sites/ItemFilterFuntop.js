let main = async function (item, options = {}) {

  if (item.title) {
    if (item.title.startsWith('[直播]') || 
        item.title.startsWith('[轉播]') ||
        item.title.startsWith('[線上看]') ||
        item.title.startsWith('[好康]')) {
      return false
    }
  }


  // ----------------------------------------------------------------

  if (!item.content) {
    return item
  }

  let content = item.content
  let pos = content.indexOf('</header>')
  if (pos === -1) {
    console.log('no pos')
    return item
  }
  
  content = content.slice(pos + 9).trim()

  item.content = content

  // <p>加入<a href="https://www.facebook.com/Funtop.tw">「FUNTOP粉絲團」</a>，查詢更多懶人包資訊</p>

  pos = content.lastIndexOf(`<p>加入<a href="https://www.facebook.com/Funtop.tw">「FUNTOP粉絲團」</a>，查詢更多懶人包資訊</p>`)
  if (pos > -1) {
    content = content.slice(0, pos).trim()
    item.content = content
  }
  
  pos = content.lastIndexOf(`<footer>`)
  if (pos > -1) {
    content = content.slice(0, pos).trim()
    item.content = content
  }

  return item
}

module.exports = main