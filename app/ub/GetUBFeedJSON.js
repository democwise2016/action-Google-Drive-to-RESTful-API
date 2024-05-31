let Parser = require('rss-parser');
// let parser = new Parser();
let parser
let NodeCacheSqlite = require('./../lib/NodeCacheSqlite.js');

module.exports = async function (feedURL, options = {}) {
  let {
    cacheDay = 0.3, 
  } = options

  // return await NodeCacheSqlite.get('GetUBFeedJSON', feedURL, async function () {
    console.log('get feed', feedURL, (new Date()).toISOString())

    if (!parser) {
      parser = new Parser()
    }

    let output = await parser.parseURL(feedURL)


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
  // }, parseInt(cacheDay * 1000 * 60 * 60 * 24, 10))
}