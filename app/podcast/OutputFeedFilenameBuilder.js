const ParseRSSID = require('./../rss/ParseRSSID.js')

module.exports = function (feedItem = {}) {
  let {
    feedID,
    feedURL
  } = feedItem

  let filename = ParseRSSID(feedURL)
  if (feedID) {
    filename = feedID + '-' + filename
  }

  return filename
}