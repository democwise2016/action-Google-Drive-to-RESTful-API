const ItemFilterFBTitle = require('./ItemFilterFBTitle.js')
const ItemFilterFBContent = require('./ItemFilterFBContent.js')
const ItemFilterFBThumbnail = require('./ItemFilterFBThumbnail.js')
const ItemFilterFBTitleRemoveID = require('./ItemFilterFBTitleRemoveID.js')
const ItemFilterFBContentVideo = require('./ItemFilterFBContentVideo.js')
const ItemFilterImageEmbed = require('./../common/ItemFilterImageEmbed.js')
// const ItemFilterFBContentExtract = require('./ItemFilterFBContentExtract.js')

let main = async function (item, options = {}) {
  let filters = [
    ItemFilterFBTitle,
    ItemFilterFBContent,
    ItemFilterFBThumbnail,
    ItemFilterFBTitleRemoveID,
    ItemFilterFBContentVideo,
    ItemFilterImageEmbed,
    // ItemFilterFBContentExtract
  ]

  for (let i = 0; i < filters.length; i++) {
    let filter = filters[i]
    item = await filter(item, options)

    if (!item) {
      return false
    }
  }

  return item    
}

module.exports = main