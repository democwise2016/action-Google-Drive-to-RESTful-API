const cheerio = require('cheerio')

var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function replaceTag(tag) {
  return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
  return str.replace(/[&<>]/g, replaceTag);
}

let main = async function (item, options) {

  if (!item.content) {
    return item
  }

  let content = item.content
  let pos = content.indexOf('\n')
  if (pos === -1) {
    console.log('no pos')
    return item
  }
  
  let part1 = content.slice(0, pos + 1)
  let part2 = content.slice(pos + 1)
  // console.log({part1, part2})


  part2 = part2.split('\n').join('<br />\n')
  
  item.content = part1 + '<br />' + part2

  while (item.content.indexOf('<br /><br />') > -1) {
    item.content = item.content.split('<br /><br />').join('<br />')
  }

  item.content = item.content.split('https://images.pling.com/cache/40x40/img/').join('https://images.pling.com/img/')

  return item
}

module.exports = main