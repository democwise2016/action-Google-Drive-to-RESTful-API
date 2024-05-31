const MAX_LENGTH = 30

function removeHtmlTagsWithRegex(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, '');
}


let main = async function (item, rss) {
  // console.log(item)
  let content = item.content

  // console.log(item)
  // process.exit(0)

  if (!content) {
    return item
  }

  // --------------

  let title = content.slice(content.indexOf('：') + 1).trim()
  title = removeHtmlTagsWithRegex(title)

  if (title.startsWith('與你們分享')) {
    title = title.slice(5)
  }

  let nrPos = title.indexOf('\n')
  if (nrPos > 0) {
    title = title.substring(0, nrPos).trim()
  }
  else {
    let splitors = [' ', '，', '。', '！', '？']
    let stop = false
    for (let j = 0; j < splitors.length; j++) {
      let splitor = splitors[j]
      if (title.indexOf(splitor) === -1) {
        continue
      }

      let parts = title.split(splitor)
      let output = ''
      for (let i = 0; i < parts.length; i++) {
        if (output !== '') {
          output = output + splitor  
        }
        output = output + parts[i]
        if (output.length > MAX_LENGTH) {
          stop = true
          break
        }
      }
      title = output

      if (stop) {
        break
      }
    }
      
  }

  if (title.length > MAX_LENGTH) {
    title = title.substring(0, MAX_LENGTH).trim() + '...'
  }

  if (title.startsWith('#')) {
    title = title.slice(1).trim()
  }

  item.title = title

  return item
}

module.exports = main