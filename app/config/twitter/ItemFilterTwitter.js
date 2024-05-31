const ItemFilterTwitterTitle = require('./ItemFilterTwitterTitle.js')
const ItemFilterTwitterContentClean = require('./ItemFilterTwitterContentClean.js')
const ItemFilterTwitterContentExtract = require('./ItemFilterTwitterContentExtract.js')
// const ItemFilterFBContentExtract = require('./ItemFilterFBContentExtract.js')

let main = async function (item, options = {}) {
  let filters = [
    ItemFilterTwitterTitle,
    ItemFilterTwitterContentClean,
    ItemFilterTwitterContentExtract
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