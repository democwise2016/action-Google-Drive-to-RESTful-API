const ItemDownload = require('./ItemDownload.js')
const CONFIG = require('../../../config-json.js')

let startTimer = false
let maxExcutionMS = CONFIG.maxExcutionMinutes * 60 * 1000

const isNewerThenLatestFile = require('./isNewerThenLatestFile.js')
const getFileListByCreationDate = require('./getFileListByCreationDate.js')
const NodeCacheSqlite = require('../../lib/NodeCacheSqlite.js')

const ItemDownloadPathBuilder = require('./ItemDownloadPathBuilder.js')
const CaptionDownloader = require('./CaptionDownloader/CaptionDownloader.js')
let nextChannelCount = 0

const fs = require('fs')

module.exports = async function (items = [], feedItem = {}) {

  if (!startTimer) {
    startTimer = (new Date()).getTime()
  }

  let {
    // feedID,
    // feedFilename,
    itemFilters = [], 
    options = {},
    feedFilename = ''
  } = feedItem

  let {
    maxItems = CONFIG.maxDownloadItemPerFeed,
  } = options

  if (typeof(itemFilters) === 'function' && Array.isArray(itemFilters) === false) {
    itemFilters = [itemFilters]
  }

  // -------------

  // let folderc = `/output/${feedFilename}/`
  let filteredItems = []
  let count = items.length
  // if (count > maxItems) {
  //   count = maxItems
  // }

  // let notCachedCount = 0
  let downloadedCount = 0

  return new Promise(async (resolve) => {
    let timer = setTimeout(() => {
      console.log([`[RSSDownloaderItems] 超過執行時間`, (CONFIG.maxExcutionMinutes - 1), item.url, feedFilename, (new Date().toISOString())].join('\t'))
      resolve(filteredItems)
    }, (CONFIG.maxExcutionMinutes - 1) * 60 * 1000)

    try {
      for (let i = 0; i < count; i++) {
        if ((new Date()).getTime() - startTimer > maxExcutionMS) {
          console.log([`[RSSDownloaderItems] 超過執行時間`, CONFIG.maxExcutionMinutes, item.url, feedFilename, (new Date().toISOString())].join('\t'))
          break
        }

        item = items[i]

        if (!item) {
          console.log([`[RSSDownloaderItems] Item is invalid`, items[i].link, feedFilename, (new Date().toISOString())].join('\t'))
          continue
        }

        let passed = true
        for (let j = 0; j < itemFilters.length; j++) {
          if (await itemFilters[j](item, options) === false) {
            passed = false
            break
          }
        }
        if (passed === false) {
          console.log([`[RSSDownloaderItems] Not paassed`, item.link, feedFilename, (new Date().toISOString())].join('\t'))
          continue
        }
 
        // ======================
        filteredItems.push(item)
        downloadedCount++

        console.log([`[RSSDownloaderItems] Download pushed`, item.url, feedFilename, downloadedCount, (new Date().toISOString())].join('\t'))
        fs.writeFileSync(`/app/tmp/GetHTML.txt`, (new Date()).getTime() + '', 'utf8') 
        
        if (downloadedCount >= maxItems) {
          nextChannelCount++
          console.log([`[DOWNLOAD] Reach maxItems ${maxItems}. Go to next channel.`, feedFilename, nextChannelCount, (new Date().toISOString())].join('\t'))
          break
        }

        // break
      }
    }
    catch (e) {
      console.error([e, (new Date().toISOString())].join('\t'))
    }

    // await CleanOldItems(feedItem)

    clearTimeout(timer)
    // return filteredItems
    resolve(filteredItems)
  })
    
}