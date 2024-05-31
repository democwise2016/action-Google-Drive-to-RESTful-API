//const htmlLoader = require('./../../../api/full-text-parser/html-loader/htmlLoader.js')

// const htmlLoader = require('./../lib/GetHTML.js')
const htmlLoader = require('./HTMLLoader.js')

const cheerio = require('cheerio')

const xFBLinkParser = require('./xFBLinkParser.js')
const xFBIsVideo = require('./xFBIsVideo.js')

// const FeedItemGetLink = require('./../../../api/lib/xmlTransformers/FeedItemGetLink.js')

const nodeCache = require('./../lib/NodeCacheSqlite.js')

const xFBType = async function (link) {
  
  //let link = item.find('link:first').text().trim()
  // let link = FeedItemGetLink(item)
  // let link = item.link
  // console.log({item})
  
  // if ((await nodeCache.isExists('xFBType', link)) === false) {
  //   getXFBType(link) // 不用await，因為不想卡死在這裡
  //   return false
  //   // 表示還在讀取中
  // }
  return await getXFBType(link)
}

const getXFBType = async function (link) {
  
  // return await nodeCache.get('xFBType', link, async () => {

    if (link.startsWith('https://www.facebook.com/')) {
      link = 'https://m.facebook.com/' + link.slice(25)
    }

    //console.log(link)

    let html = await htmlLoader(link)

    const $ = cheerio.load(html) // 載入 body
    // console.log($('body').html())
    // console.log(html.indexOf('https://lm.facebook.com/l.php?'))

    
    let outputURL = xFBLinkParser($)

    if (outputURL) {
      if (outputURL.startsWith('https://m.facebook.com/')) {
        outputURL = 'https://www.facebook.com/' + outputURL.slice(23)
      }

      return outputURL
    }

    // ------------------
    if (xFBIsVideo($)) {
      return 'video'
    }

    return 'post'
  // })
}

module.exports = xFBType