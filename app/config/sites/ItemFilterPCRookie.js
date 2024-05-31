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

  //console.log(content)
  //console.log(content.indexOf('p-80'))
  const $ = cheerio.load(item.content)
  
  $('body > div[align="center"]').remove()

  item.content = $('body').html()

  return item
}

module.exports = main