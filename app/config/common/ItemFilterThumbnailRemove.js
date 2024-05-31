
let main = async function (item, options) {
  // console.log(item)
  if (!item.thumbnail) {
    return item
  }

  item.thumbnail = undefined

  return item
}

module.exports = main