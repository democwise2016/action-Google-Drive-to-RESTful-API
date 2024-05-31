let Parser = require('rss-parser');
let GoogleDriveFolderParser = require('./GoogleDriveFolderParser.js');

let DetectParserType = require('./DetectParserType.js');
// let parser = new Parser();
let parser
let NodeCacheSqlite = require('../lib/NodeCacheSqlite.js');
const CONFIG = require('../../config-json.js');

module.exports = async function (feedURL, options = {}) {
  let {
    cacheDay = 0, 
    proxy
  } = options

  cacheDay = 0

  let main = async function () {
    console.log('get feed', feedURL, parseInt(cacheDay * 1000 * 60 * 60 * 24, 10), (new Date()).toISOString())

    let parserType = DetectParserType(feedURL)

    if (parserType === 'rss' && !parser) {
      parser = new Parser({
        customFields: {
          feed: [],
          item: [
            // ['media:content', 'media']
            'dc:content',
            ['media:content', 'media:content', {keepArray: true}],
          ],
        },
        requestOptions: {
          rejectUnauthorized: false
        }
      })
    }

    let crawlTargetURL = feedURL
    if (proxy) {
      crawlTargetURL = CONFIG.proxy + encodeURIComponent(crawlTargetURL)
    }

    // console.log({crawlTargetURL})
    let output
    if (parserType === 'rss') {
      output = await parser.parseURL(crawlTargetURL)
    }
    else if (parserType === 'gdrive') {
      return await GoogleDriveFolderParser(crawlTargetURL)
    }
    
      
    // console.log(output)

    if (!output.thumbnail && output.image && output.image.url) {
      output.thumbnail = output.image.url
    }
    if (!output.thumbnail && options.thumbnail) {
      output.thumbnail = options.thumbnail
    }
    // console.log(output)
    // process.exit(1)

    output.items = output.items.map(item => {
      let media = JSON.stringify(item['media:content'])
      if (media) {
        // console.log(media)
        media = JSON.parse(media)[0]['$']['url']
        item.thumbnail = media
      }
      // console.log()
      // item.thumbnail = item['media:content'][0]['$']['url']

      if (item.content && item['content:encoded']) {
        if (item['content:encoded'].length > item.content.length) {
          item.content = item['content:encoded']
        }
      }
      // console.log(item)
      if (item.content && item['dc:content']) {
        if (item['dc:content'].length > item.content.length) {
          item.content = item['dc:content']
        }
      }

      if (!item.content && item.summary) {
        item.content = item.summary.trim()
      }
      // console.log(item.content)
      return item
    })

    
    // console.log(output.items[0])

    // console.log(output.items[0]['media:content'])
    // process.exit(1)


    if (output.link === feedURL) {
      let id = feedURL.split('=').slice(-1)[0]
      output.link = 'https://www.youtube.com/playlist?list=' + id
      // channelURL = 
    }
    if (!output.feedLink) {
      output.feedLink = feedURL
      // channelURL = 
    }

    // output

    // console.log(output) 

    return output
  }

  if (CONFIG.debug === false) {
    return await NodeCacheSqlite.get('GetRSSFeedJSON', feedURL, main, parseInt(cacheDay * 1000 * 60 * 60 * 24, 10))
  }
  else {
    return main()
  }
}