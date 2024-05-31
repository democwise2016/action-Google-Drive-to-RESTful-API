const ParseRSSID = require('./ParseRSSID.js')
const GetRSSFeedJSON = require('./GetRSSFeedJSON.js')
// const SiteInfo = require('./SiteInfo.js')
const RSSFeedBuilder = require('./builder/RSSFeedBuilder.js')

const GoogleDriveFeedBuilder = require('./gdrive/GoogleDriveFeedBuilder.js')
const GoogleDriveFeedIndexBuilder = require('./gdrive/GoogleDriveFeedIndexBuilder.js')

// const RSSDownloaderItems = require('./items/RSSDownloaderItems.js')
// const getFileListByCreationDate = require('./items/getFileListByCreationDate.js')

const fs = require('fs');

const ShellSpawn = require('../lib/ShellSpawn.js')

let DetectParserType = require('./DetectParserType.js');

// const OutputFeedFilenameBuilder = require('./../podcast/OutputFeedFilenameBuilder.js')
let RSSBuildCounter = 0

module.exports = async function (feedItem = {}) {

  let {
    feedURL, 
    feedID,
    feedFilename,
    // itemFilters, 
    options = {}
  } = feedItem

  // ---------
  // 取得ID
  if (!feedID) {
    feedID = ParseRSSID(feedURL)
  }
  // console.log(getFileListByCreationDate(`/output/${feedID}`))

  // console.log(id)

  // ---------
  // 取得Feed的資訊
  let parserType = DetectParserType(feedURL)
  let feedJSON = await GetRSSFeedJSON(feedURL, options)
  // fs.writeFileSync('/output/feed.json', JSON.stringify(feedJSON, null, 2), 'utf8')
  
  // ---------
  // 取得頻道的網址
  // let channelURL = feedJSON.link
  // let channelInfo = await SiteInfo.load(channelURL)

  // if (!channelInfo) {
  //   return false
  // }

  // console.log(channelInfo)
  // feedJSON.channelAvatar = channelInfo.channelAvatar
  // feedJSON.thumbnail = channelInfo.thumbnail
  feedJSON = {
    // ...channelInfo,
    ...feedJSON,
    ...feedItem
  }

  // ---------
  if (parserType === 'rss') {
    // let filename = OutputFeedFilenameBuilder(feedItem)
    // feedJSON.items = await RSSDownloaderItems(feedJSON.items, feedItem)
    
    // // ---------
    // // 建立Feed
    // let outputFeedString = await RSSFeedBuilder(feedJSON)

    // // console.log(outputFeedString)
    // fs.writeFileSync(`/output/${feedFilename}.rss`, outputFeedString, 'utf8') 
    // RSSBuildCounter++
    // console.log([`[RSSDownloader] RSS build`, feedFilename, RSSBuildCounter, (new Date().toISOString())].join('\t'))
  }
  else if (parserType === 'gdrive') {
    await GoogleDriveFeedBuilder(feedJSON)
  }  

  // await ShellSpawn([`chmod`, `-R`, `777`, `/output/*`])
  // console.log([`[UBDownloader] Chmod finish`, feedFilename, RSSBuildCounter, (new Date().toISOString())].join('\t'))
}