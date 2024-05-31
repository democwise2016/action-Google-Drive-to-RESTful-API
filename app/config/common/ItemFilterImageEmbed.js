const cheerio = require('cheerio')
const FileCache = require('./../../file-cache/FileCache.js');

const he = require('he');

const ItemFilterThumbnailCache = require('./ItemFilterThumbnailCache.js')

let main = async function (item, options = {}) {
  let content = item.content
  const $ = cheerio.load(content)
  
  let imgList = $(`img[src]`)
  for (let i = 0; i < imgList.length; i++) {
    let img = imgList.eq(i)
    let src = img.attr('src')
    // console.log(src)
    if (src === '') {
      continue
    }
    try {
      let imgurURL = await FileCache(src, options)
      //console.log('cImgur', src, imgurURL)
      // imgurURL = he.encode(imgurURL)
      // console.log(imageURL)
      img.attr('src', imgurURL)
    } catch (e) {
      console.error(src)
      console.error(e)
      return content
    }
  }
  
  content = $('body').html()
  item.content = content

  item = await ItemFilterThumbnailCache(item)

  return item
}

module.exports = main