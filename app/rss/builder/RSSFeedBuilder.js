const getRedirectedURL = require('./getRedirectedURL.js')
const linkifyUrls = require('linkify-urls');

const moment = require('moment')
const CONFIG = require('./../../../config.js')

const RSSFeedBuilderChannel = require('./RSSFeedBuilderChannel.js')
const RSSFeedBuilderItem = require('./RSSFeedBuilderItem.js')

module.exports = async function (options) {
  let output = []
  
  output.push(await RSSFeedBuilderChannel(options))
  await RSSFeedBuilderItem(options, output)
  
  // --------------------------------------------------
  
  
  
  output.push(`</channel>
</rss>`)
  
  return output.join('')
}