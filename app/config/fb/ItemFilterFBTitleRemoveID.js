const MAX_LENGTH = 30

let main = async function (item, rss) {
  
  let title = item.title
  
  if (title && title.indexOf('\n') > -1) {
    title = title.slice(title.indexOf('\n') + 1).trim()
    // console.log(title)
    item.title = title
  }

  // let content = item.content
  // let needle = `<br>\n<br>\n`
  // if (content && content.indexOf(needle) > -1) {
  //   content = content.slice(content.indexOf(needle) + needle.length).trim()
  //   item.content = content
  // }

  return item
}

module.exports = main