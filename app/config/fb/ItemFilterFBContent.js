let main = async function (item, rss) {
  // console.log(item)
  let content = item.content

  // console.log(item)
  // process.exit(0)

  if (!content) {
    return item
  }

  // content = content.replace(/<br>\n<br>\n/g, '<br>\n')
  content = content.replace(/"><br>\n<br>\n<img src="/g, '"><img src="')
  
  item.content = content

  return item
}

module.exports = main